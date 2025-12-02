// En: /Mark/Captura/Visitas/DAOs/CapturaVisitasDAO.cs
using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.Captura.VisitasDTOs;
using System.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Loki.Mark.Captura.Visitas.DAOs
{
	public class CapturaVisitasDAO : ICapturaVisitasDAO
	{
		private readonly IDbContextFactory _dbContextFactory;

		public CapturaVisitasDAO(IDbContextFactory dbContextFactory)
		{
			_dbContextFactory = dbContextFactory;
		}

		public async Task<CuentaBusquedaDto?> BuscarCuentaAsync(string servidor, int idCartera, string cuentaOrExpediente, bool esExpediente)
		{
			string sql;
			object parametros;
			using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
			{
				if (esExpediente)
				{
					// Lógica de búsqueda de expediente (simplificada)
					if (cuentaOrExpediente.Length <= 3 || !int.TryParse(cuentaOrExpediente.AsSpan(3), out int numExp))
						return null;
					sql = @"SELECT C.idCuenta, Car.Abreviación + CONVERT(VARCHAR(10), C.Expediente) AS Expediente, C.NombreDeudor
                            FROM dbo.Cuentas C INNER JOIN dbo.Carteras Car ON C.idCartera = Car.idCartera
                            WHERE Car.Abreviación = @Abreviacion AND C.Expediente = @NumeroExp AND C.idCartera = @IdCartera AND C.CuentaActiva = 1";
					parametros = new { Abreviacion = cuentaOrExpediente.Substring(0, 3), NumeroExp = numExp, IdCartera = idCartera };
				}
				else
				{
					sql = @"SELECT C.idCuenta, Car.Abreviación + CONVERT(VARCHAR(10), C.Expediente) AS Expediente, C.NombreDeudor
                            FROM dbo.Cuentas C INNER JOIN dbo.Carteras Car ON C.idCartera = Car.idCartera
                            WHERE C.idCuenta = @IdCuenta AND C.idCartera = @IdCartera AND C.CuentaActiva = 1";
					parametros = new { IdCuenta = cuentaOrExpediente, IdCartera = idCartera };
				}
				return await connection.QuerySingleOrDefaultAsync<CuentaBusquedaDto>(sql, parametros);
			}
		}

		public async Task<IEnumerable<DomicilioCapturaDto>> ObtenerDomiciliosAsync(string servidor, int idCartera, string idCuenta)
		{
			string sql = "SELECT * FROM dbCollection.dbo.fn_DomiciliosCaptura(@idCartera, @idCuenta)";
			using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
			{
				return await connection.QueryAsync<DomicilioCapturaDto>(sql, new { idCartera, idCuenta });
			}
		}

		public async Task<GuardarGestionResponseDto> GuardarGestionDomiciliariaAsync(string servidor, CapturaVisitaRequestDto visita, int idEjecutivoCaptura)
		{
			string spName = "dbo.[2.6.1.GuardaGestiónDomiciliaria]";
			using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
			{
				var parametros = new DynamicParameters();
				parametros.Add("idCartera", visita.IdCartera);
				parametros.Add("idCuenta", visita.IdCuenta);
				parametros.Add("idDomicilio", visita.IdDomicilio);
				parametros.Add("idEjecutivo_Captura", idEjecutivoCaptura); // ID del usuario logueado
				parametros.Add("FechaVisita", visita.FechaVisita);
				parametros.Add("HoraVisita", visita.HoraVisita);
				parametros.Add("ColorFachada", visita.ColorFachada);
				parametros.Add("ColorPuerta", visita.ColorPuerta);
				parametros.Add("ColorHerreria", visita.ColorHerreria);
				parametros.Add("Pisos", visita.Pisos);
				parametros.Add("idVivienda", visita.IdVivienda);
				parametros.Add("idHabitacion", visita.IdHabitacion);
				parametros.Add("idEconomico", visita.IdEconomico);
				parametros.Add("NombrePropietario", visita.NombrePropietario);
				parametros.Add("AutoMapeo", visita.AutoMapeo);
				parametros.Add("AutoMarca", visita.AutoMarca);
				parametros.Add("AutoModelo", visita.AutoModelo);
				parametros.Add("AutoAño", visita.AutoAño);
				parametros.Add("AutoPlacas", visita.AutoPlacas);
				parametros.Add("Atendio", visita.Atendio);
				parametros.Add("Paquete", visita.Paquete);
				parametros.Add("CalleHorizontalNorte", visita.CalleHorizontalNorte);
				parametros.Add("CalleHorizontalSur", visita.CalleHorizontalSur);
				parametros.Add("CalleVerticalEste", visita.CalleVerticalEste);
				parametros.Add("CalleVerticalOeste", visita.CalleVerticalOeste);
				parametros.Add("idContacto", visita.IdContacto);
				parametros.Add("idParentesco", visita.IdParentesco);
				parametros.Add("idSituación", visita.IdSituacion);
				parametros.Add("idCausaNoPago", visita.IdCausaNoPago);
				parametros.Add("idSucursal", visita.IdSucursal);
				parametros.Add("UsuarioVisitador", visita.UsuarioVisitador);
				parametros.Add("Comentario", visita.Comentario);
				parametros.Add("MontoNegociación", visita.MontoNegociacion);
				parametros.Add("FechaPagoNegociación", visita.FechaPagoNegociacion);

				// El SP devuelve una tabla con 'Mensaje' o 'idVisitador'
				var resultado = await connection.QueryFirstOrDefaultAsync<GuardarGestionResponseDto>(spName, parametros, commandType: CommandType.StoredProcedure);
				return resultado ?? new GuardarGestionResponseDto { Mensaje = "Error inesperado: El SP no devolvió respuesta." };
			}
		}

		public async Task<bool> GuardarTelefonoAsync(string servidor, int idCartera, string idCuenta, int idVisitador, string telefono)
		{
			string spName = "dbo.[2.2.GuardaNuevoTeléfono]";
			using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
			{
				var parametros = new
				{
					idCartera = idCartera,
					idCuenta = idCuenta,
					idEjecutivo = idVisitador, // idVisitador devuelto por el SP anterior
					NúmeroTelefónico = long.Parse(telefono), // El SP espera BIGINT
					idTelefonía = 0,
					idOrigen = 1807, // Fijo: Visita
					idClase = 1502,  // Fijo: Nuevo
					SegHorarioContacto = (TimeSpan?)null,
					Extensión = (int?)null
				};
				var resultado = await connection.QueryFirstOrDefaultAsync(spName, parametros, commandType: CommandType.StoredProcedure);
				// El SP devuelve 'Resultado' si falla (Lista Negra)
				if (resultado != null && ((IDictionary<string, object>)resultado).ContainsKey("Resultado"))
				{
					return false; // Error (ej. Lista Negra)
				}
				return true; // Asumimos éxito si no devuelve error
			}
		}

		public async Task<bool> GuardarDatosVisitaCFEAsync(string servidor, CapturaVisitaRequestDto visita)
		{
			string spName = "CFE.InsertaDatosVisita";
			using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Process")) // Conectar a dbProcess
			{
				var parametros = new
				{
					idCartera = visita.IdCartera,
					idCuenta = visita.IdCuenta,
					Fecha = visita.FechaVisita,
					Segundo = visita.HoraVisita,
					Medidor = visita.NumeroMedidor,
					Energía = visita.EnergiaElectrica ?? false,
					Acuse = visita.AcuseRequerimiento ?? false,
					Fotografía = visita.FotografiaPredio ?? false,
					Latitud = visita.Latitud,
					Longitud = visita.Longitud
				};
				int affectedRows = await connection.ExecuteAsync(spName, parametros, commandType: CommandType.StoredProcedure);
				return affectedRows > 0;
			}
		}
	}
}