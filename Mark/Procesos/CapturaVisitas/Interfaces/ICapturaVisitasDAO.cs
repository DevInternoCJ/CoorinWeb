// En: /Mark/Captura/Visitas/DAOs/ICapturaVisitasDAO.cs
using Loki.DTOs.Captura.VisitasDTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Loki.Mark.Captura.Visitas.DAOs
{
	public interface ICapturaVisitasDAO
	{
		/// <summary>
		/// Busca una cuenta por su ID o Expediente.
		/// </summary>
		Task<CuentaBusquedaDto?> BuscarCuentaAsync(string servidor, int idCartera, string cuentaOrExpediente, bool esExpediente);

		/// <summary>
		/// Obtiene los domicilios de una cuenta usando la función fn_DomiciliosCaptura.
		/// </summary>
		Task<IEnumerable<DomicilioCapturaDto>> ObtenerDomiciliosAsync(string servidor, int idCartera, string idCuenta);

		/// <summary>
		/// Ejecuta el SP [2.6.1.GuardaGestiónDomiciliaria].
		/// </summary>
		/// <returns>Un DTO con el idVisitador (si es exitoso) o un Mensaje de error (si falla).</returns>
		Task<GuardarGestionResponseDto> GuardarGestionDomiciliariaAsync(string servidor, CapturaVisitaRequestDto visita, int idEjecutivoCaptura);

		/// <summary>
		/// Ejecuta el SP [2.2.GuardaNuevoTeléfono].
		/// </summary>
		/// <returns>Verdadero si fue exitoso.</returns>
		Task<bool> GuardarTelefonoAsync(string servidor, int idCartera, string idCuenta, int idVisitador, string telefono);

		/// <summary>
		/// Ejecuta el SP [CFE].[InsertaDatosVisita] en la base de datos dbProcess.
		/// </summary>
		/// <returns>Verdadero si fue exitoso.</returns>
		Task<bool> GuardarDatosVisitaCFEAsync(string servidor, CapturaVisitaRequestDto visita);
	}

	/// <summary>
	/// DTO auxiliar para manejar la respuesta del SP GuardaGestiónDomiciliaria.
	/// </summary>
	public class GuardarGestionResponseDto
	{
		public int? IdVisitador { get; set; }
		public string? Mensaje { get; set; }
	}
}