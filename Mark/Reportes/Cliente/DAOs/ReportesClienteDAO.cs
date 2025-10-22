// Ubicación: /Mark/Reportes/Cliente/DAOs/ReportesClienteDAO.cs
using CoorinWeb.Loki.Global; // Para IDbContextFactory y EntityTypeHelper
using Dapper;
using Loki.DTOs.Reportes.ClienteDTOs;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using Microsoft.EntityFrameworkCore; // Necesario si EntityTypeHelper lo requiere

namespace Loki.Mark.Reportes.Cliente.DAOs
{
	public class ReportesClienteDAO : IReportesClienteDAO
	{
		private readonly IDbContextFactory _dbContextFactory;
		// Asumiendo que EntityTypeHelper es estático o inyectado si es un servicio
		// private readonly EntityTypeHelper _entityTypeHelper;

		// Ajusta el constructor si EntityTypeHelper se inyecta
		public ReportesClienteDAO(IDbContextFactory dbContextFactory /*, EntityTypeHelper entityTypeHelper */)
		{
			_dbContextFactory = dbContextFactory;
			// _entityTypeHelper = entityTypeHelper;
		}

		public async Task<IEnumerable<ReporteDefinicionDto>> GetReporteDefinicionesAsync(string servidor)
		{
			var context = _dbContextFactory.GetDbContext(servidor, "Collection"); // O donde esté la tabla ReportesAlCliente

			// Usamos EntityTypeHelper para obtener los datos dinámicos
			var definicionesDinamicas = await EntityTypeHelper.GetFullEntityTable(context, "ReportesAlCliente");

			// Filtramos y mapeamos manualmente a DTO
			var definicionesDto = definicionesDinamicas
				.Cast<dynamic>()
				.Where(d => d.Activo == true)
				.Select(d => new ReporteDefinicionDto
				{
					IdReporte = d.IdReporte,
					Reporte = d.Reporte,
					Descripcion = d.Descripción, // Asegúrate que el nombre de propiedad sea correcto
					IdCartera = d.IdCartera,
					RequiereProducto = d.ParamProducto,
					RequiereDesde = d.ParamDesde,
					RequiereHasta = d.ParamHasta
				})
				.OrderBy(d => d.IdCartera).ThenBy(d => d.Reporte);

			return definicionesDto;
		}

		public async Task<Dictionary<string, IEnumerable<dynamic>>> GenerarReporteAsync(
			string servidor,
			dynamic definicion, // Recibe la definición dinámica
			GenerarReporteRequestDto parametrosUsuario)
		{
			var dapperParams = new DynamicParameters();
			var sqlBuilder = new StringBuilder();
			var paramsList = new List<string>();

			// Accedemos a las propiedades del objeto dynamic
			bool esSP = definicion.EsProcedimientoOfunción;
			string baseDatos = definicion.BaseDatos;
			string esquema = definicion.Esquema;
			string funcionStore = definicion.FunciónStore;
			bool nombresTabla = definicion.NombresTabla;
			bool paramDesde = definicion.ParamDesde;
			bool paramHasta = definicion.ParamHasta;
			bool paramProducto = definicion.ParamProducto;
			short idCartera = definicion.IdCartera; // Asumiendo que IdCartera está en la definición
			short idReporte = definicion.IdReporte; // Asumiendo que IdReporte está en la definición

			// 1. Construir llamada
			if (esSP) { sqlBuilder.Append($"EXEC {baseDatos}.{esquema}.[{funcionStore}] "); }
			else { sqlBuilder.Append($"SELECT * FROM {baseDatos}.{esquema}.{funcionStore}("); }

			// 2. Añadir parámetros
			if (paramDesde) { paramsList.Add("@Fecha_Desde"); dapperParams.Add("Fecha_Desde", parametrosUsuario.FechaDesde?.ToString("yyyy-MM-dd")); }
			if (paramHasta) { paramsList.Add("@Fecha_Hasta"); dapperParams.Add("Fecha_Hasta", parametrosUsuario.FechaHasta?.ToString("yyyy-MM-dd")); }
			if (idCartera == 5 && idReporte == 21 && !string.IsNullOrEmpty(parametrosUsuario.Segmento))
			{
				paramsList.Add("@iProducto");
				int valorSegmento = parametrosUsuario.Segmento.Equals("Castigo", StringComparison.OrdinalIgnoreCase) ? 10 : 40;
				dapperParams.Add("iProducto", valorSegmento);
			}
			else if (paramProducto)
			{
				paramsList.Add("@iProducto"); dapperParams.Add("iProducto", parametrosUsuario.IdProducto);
			}
			// Añadir otros parámetros comunes si es necesario

			// 3. Parámetro de salida
			if (nombresTabla && esSP)
			{
				paramsList.Add("@NombresTablas = @NombresParam OUTPUT");
				dapperParams.Add("NombresParam", dbType: DbType.String, direction: ParameterDirection.Output, size: 8000);
			}

			// 4. Finalizar SQL
			if (esSP) { sqlBuilder.Append(string.Join(", ", paramsList)); }
			else { sqlBuilder.Append(string.Join(", ", paramsList.Select(p => p.Split('=')[0].Trim()))).Append(')'); }

			// 5. Ejecutar y procesar
			var resultados = new Dictionary<string, IEnumerable<dynamic>>();
			using (var connection = _dbContextFactory.GetSqlConnection(servidor, baseDatos))
			{
				using (var multi = await connection.QueryMultipleAsync(sqlBuilder.ToString(), dapperParams, commandType: esSP ? CommandType.StoredProcedure : CommandType.Text))
				{
					int tableIndex = 0;
					string[] nombresTablaArray = nombresTabla ? dapperParams.Get<string>("NombresParam")?.Split('|') ?? Array.Empty<string>() : Array.Empty<string>();

					while (!multi.IsConsumed)
					{
						var tablaActual = await multi.ReadAsync<dynamic>();
						if (tablaActual.Any())
						{
							string nombreTabla = (nombresTablaArray.Length > tableIndex) ? nombresTablaArray[tableIndex].Trim() : $"Tabla{tableIndex + 1}";
							resultados.Add(nombreTabla, tablaActual);
						}
						tableIndex++;
					}
				}
			}
			return resultados;
		}
	}
}