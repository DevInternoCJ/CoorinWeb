// En: /Mark/Captura/Visitas/Services/CapturaVisitasService.cs
using Loki.DTOs.Captura.VisitasDTOs;
using Loki.Mark.Captura.Visitas.DAOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;
using Microsoft.Extensions.Logging; // Opcional, pero recomendado

namespace Loki.Mark.Captura.Visitas.Services
{
	public class CapturaVisitasService : ICapturaVisitasService
	{
		private readonly ICapturaVisitasDAO _dao;
		private readonly ILogger<CapturaVisitasService> _logger; // Logger opcional

		public CapturaVisitasService(ICapturaVisitasDAO dao, ILogger<CapturaVisitasService> logger)
		{
			_dao = dao;
			_logger = logger;
		}

		/// <summary>
		/// Busca una cuenta por ID o Expediente y devuelve sus domicilios.
		/// </summary>
		public async Task<CuentaConDomiciliosDto?> ObtenerCuentaConDomiciliosAsync(string servidor, int idCartera, string cuentaOrExpediente, bool esExpediente)
		{
			var cuenta = await _dao.BuscarCuentaAsync(servidor, idCartera, cuentaOrExpediente, esExpediente);
			if (cuenta == null)
			{
				return null;
			}

			var domicilios = await _dao.ObtenerDomiciliosAsync(servidor, idCartera, cuenta.IdCuenta);

			return new CuentaConDomiciliosDto
			{
				Cuenta = cuenta,
				Domicilios = domicilios.ToList()
			};
		}

		/// <summary>
		/// Valida y guarda la información de una visita domiciliaria y sus teléfonos asociados.
		/// </summary>
		public async Task<(bool Exitoso, string Mensaje)> GuardarVisitaAsync(string servidor, CapturaVisitaRequestDto request, ClaimsPrincipal user)
		{
			// --- 1. Validaciones ---
			string? errorValidacion = ValidarDatosVisita(request);
			if (errorValidacion != null)
			{
				return (false, errorValidacion);
			}

			// Obtener idEjecutivo del token
			var idEjecutivoClaim = user.FindFirst("idEjecutivo")?.Value;
			if (!int.TryParse(idEjecutivoClaim, out int idEjecutivoCaptura))
			{
				return (false, "No se pudo obtener el ID del ejecutivo del token.");
			}

			// --- 2. Guardar Gestión Domiciliaria Principal ---
			_logger.LogInformation("Guardando gestión domiciliaria para cuenta {IdCuenta}...", request.IdCuenta);

			// --- INICIO DE LA CORRECCIÓN ---
			// Recibimos el objeto DTO de respuesta, no desconstruimos
			var gestionResponse = await _dao.GuardarGestionDomiciliariaAsync(servidor, request, idEjecutivoCaptura);

			// Verificamos si el SP devolvió un mensaje de error
			if (gestionResponse.Mensaje != null)
			{
				_logger.LogWarning("Error al guardar la gestión (controlado por SP): {Mensaje}", gestionResponse.Mensaje);
				return (false, gestionResponse.Mensaje); // Devolvemos el mensaje del SP
			}

			// Verificamos si obtuvimos el ID del visitador
			if (!gestionResponse.IdVisitador.HasValue)
			{
				_logger.LogError("Error crítico: GuardarGestionDomiciliariaAsync no devolvió ni idVisitador ni Mensaje.");
				return (false, "Error inesperado al guardar la gestión: no se recibió ID de visitador.");
			}
			// --- FIN DE LA CORRECCIÓN ---

			// --- 3. Guardar Teléfonos ---
			int telefonosFallidos = 0;
			if (request.TelefonosCapturados != null && request.TelefonosCapturados.Any())
			{
				_logger.LogInformation("Guardando {Count} teléfonos capturados...", request.TelefonosCapturados.Count);
				foreach (var telefono in request.TelefonosCapturados)
				{
					if (long.TryParse(telefono, out _) && telefono.Length == 10) // Validación simple
					{
						// Usamos la propiedad 'IdVisitador' del objeto 'gestionResponse'
						bool telGuardado = await _dao.GuardarTelefonoAsync(servidor, request.IdCartera, request.IdCuenta, gestionResponse.IdVisitador.Value, telefono);
						if (!telGuardado)
						{
							telefonosFallidos++;
							_logger.LogWarning("Falló al guardar teléfono {Telefono} (ej. lista negra).", telefono);
						}
					}
				}
			}

			// --- 4. Guardar Datos CFE (si aplica) ---
			if (request.IdCartera == 14 || request.IdCartera == 24)
			{
				if (request.NumeroMedidor != null || request.Latitud != null || request.Longitud != null)
				{
					_logger.LogInformation("Guardando datos CFE para cuenta {IdCuenta}...", request.IdCuenta);
					bool cfeGuardado = await _dao.GuardarDatosVisitaCFEAsync(servidor, request);
					if (!cfeGuardado)
					{
						_logger.LogWarning("Falló al guardar los datos CFE para la cuenta {IdCuenta}.", request.IdCuenta);
						// No lo consideramos un error fatal, solo una advertencia.
					}
				}
			}

			// --- 5. Éxito ---
			string mensajeFinal = "Visita guardada exitosamente.";
			if (telefonosFallidos > 0)
			{
				mensajeFinal += $" {telefonosFallidos} teléfono(s) no pudieron ser guardados (posiblemente en lista negra).";
			}

			return (true, mensajeFinal);
		}

		// --- Método de Validación Auxiliar ---
		private string? ValidarDatosVisita(CapturaVisitaRequestDto request)
		{
			// IDs de Catálogo clave (basados en el código de WinForms)
			const int ID_CONTACTO_TITULAR = 1101;
			const int ID_CONTACTO_LE_CONOCE = 1102;

			if (request.FechaVisita.Date > DateTime.Today.Date) return "La fecha de la visita no debe ser mayor al día actual.";
			if (request.IdHabitacion <= 0) return "Seleccione el mapeo de la visita.";
			if (request.IdContacto <= 0) return "Seleccione el contacto de la visita.";
			if (string.IsNullOrWhiteSpace(request.UsuarioVisitador) || request.UsuarioVisitador.Length != 4) return "La clave de visitador debe ser de 4 caracteres.";
			if (string.IsNullOrWhiteSpace(request.Comentario) || request.Comentario.Length < 5) return "Escriba una observación más extensa.";
			if (request.HoraVisita.Hours < 7 || request.HoraVisita.Hours >= 22) return "La hora de la visita debe ser entre 7:00 y 21:59.";

			// Validación Condicional
			if (request.IdContacto == ID_CONTACTO_TITULAR && !request.IdSituacion.HasValue)
				return "Seleccione la situación de la visita (requerido para 'Titular').";
			if (request.IdContacto == ID_CONTACTO_LE_CONOCE && !request.IdParentesco.HasValue)
				return "Seleccione el parentesco (requerido para 'Le conoce').";

			// Validación CFE
			if (request.IdCartera == 14 || request.IdCartera == 24)
			{
				if (!request.EnergiaElectrica.HasValue) return "Seleccione si cuenta con energía eléctrica.";
				if (!request.AcuseRequerimiento.HasValue) return "Seleccione si cuenta con acuse.";
				if (!request.FotografiaPredio.HasValue) return "Seleccione si cuenta con fotografía.";
			}

			return null; // Sin errores
		}
	}
}