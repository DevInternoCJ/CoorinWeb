// Ubicación: /Mark/Reportes/Cliente/DAOs/ReportesClienteDAO.cs
using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.Reportes.ClienteDTOs;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using Microsoft.EntityFrameworkCore; // O el namespace correcto para DbContext
using Microsoft.Data.SqlClient; // O System.Data.SqlClient según tu proyecto

namespace Loki.Mark.Reportes.Cliente.DAOs
{
	public class ReportesClienteDAO : IReportesClienteDAO
	{
		private readonly IDbContextFactory _dbContextFactory;

		// Caché simple para almacenar los nombres de parámetros obtenidos (opcional pero recomendado)
		// private static readonly System.Collections.Concurrent.ConcurrentDictionary<string, List<string>> _parameterNameCache = new(); // Removido

		public ReportesClienteDAO(IDbContextFactory dbContextFactory)
		{
			_dbContextFactory = dbContextFactory;
		}

		public async Task<IEnumerable<ReporteDefinicionDto>> GetReporteDefinicionesAsync(string servidor)
		{
			var context = _dbContextFactory.GetDbContext(servidor, "Collection"); // O donde esté ReportesAlCliente
			var definicionesDinamicas = await EntityTypeHelper.GetFullEntityTable(context, "ReportesAlCliente");

			var definicionesDto = definicionesDinamicas
				.Cast<dynamic>()
				.Where(d => d.Activo == true)
				.Select(d => new ReporteDefinicionDto
				{
					IdReporte = d.IdReporte,
					Reporte = d.Reporte,
					Descripcion = d.Descripción, // Cuidado con la tilde
					IdCartera = d.IdCartera,
					RequiereProducto = d.ParamProducto,
					RequiereDesde = d.ParamDesde,
					RequiereHasta = d.ParamHasta
				})
				.OrderBy(d => d.IdCartera).ThenBy(d => d.Reporte);

			return definicionesDto;
		}

		// --- INICIO DEL MÉTODO COMPLETO ---
		/// <summary>
		/// Ejecuta dinámicamente un reporte definido en la tabla ReportesAlCliente.
		/// Obtiene los nombres de los parámetros requeridos desde los metadatos de la BD.
		/// Puede ejecutar tanto Procedimientos Almacenados (SP) como Funciones de Tabla (Fn).
		/// Maneja reportes que devuelven múltiples conjuntos de resultados (tablas).
		/// </summary>
		/// <param name="servidor">El nombre del servidor donde se ejecutará la consulta (obtenido del claim).</param>
		/// <param name="definicion">Un objeto 'dynamic' que contiene la fila de configuración de ReportesAlCliente para el reporte solicitado.</param>
		/// <param name="parametrosUsuario">El DTO con los parámetros proporcionados por el usuario (fechas, idProducto, etc.).</param>
		/// <returns>
		/// Un diccionario donde cada clave es el nombre de una tabla devuelta por el reporte
		/// y el valor es una lista de objetos 'dynamic' que representan las filas de esa tabla.
		/// </returns>
		public async Task<Dictionary<string, IEnumerable<dynamic>>> GenerarReporteAsync(
					string servidor,
					dynamic definicion,
					GenerarReporteRequestDto parametrosUsuario)
		{
			var dapperParams = new DynamicParameters();
			var sqlBuilder = new StringBuilder(); // Solo para funciones
			string sqlFinal;
			CommandType commandTypeFinal;

			// Accedemos a las propiedades una vez
			bool esSP = definicion.EsProcedimientoOfunción;
			string baseDatos = definicion.BaseDatos;
			string esquema = string.IsNullOrWhiteSpace((string?)definicion.Esquema) ? "dbo" : definicion.Esquema;
			string funcionStoreOriginal = definicion.FunciónStore;
			bool nombresTabla = definicion.NombresTabla;
			bool paramDesde = definicion.ParamDesde;
			bool paramHasta = definicion.ParamHasta;
			bool paramProducto = definicion.ParamProducto;
			short idCartera = definicion.IdCartera;
			short idReporte = definicion.IdReporte;

			// Nombre limpio del objeto (sin BD, con esquema si no es dbo, con corchetes)
			string funcionStoreLimpio = funcionStoreOriginal.Replace("[", "").Replace("]", "");
			if (funcionStoreLimpio.Contains(".."))
			{
				funcionStoreLimpio = funcionStoreLimpio.Split(new[] { ".." }, StringSplitOptions.RemoveEmptyEntries).LastOrDefault() ?? funcionStoreLimpio;
			}
			string nombreCalificado = $"[{esquema}].[{funcionStoreLimpio}]"; // Construimos Schema.Object

			string baseDatosParaConexion = baseDatos.StartsWith("db", StringComparison.OrdinalIgnoreCase)
											? baseDatos.Substring(2)
											: baseDatos;

			List<string> expectedParamNames; // No inicializamos aquí

			using var connection = _dbContextFactory.GetSqlConnection(servidor, baseDatosParaConexion);
			await connection.OpenAsync();

			// --- 1. Obtener Nombres de Parámetros Reales (SIEMPRE desde BD) ---
			// Limpiamos corchetes del nombre para la búsqueda en metadatos
			expectedParamNames = await GetRoutineParameterNamesAsync(connection, esquema, funcionStoreLimpio.Replace("[", "").Replace("]", ""));

			// --- 2. Construir Objeto Dapper Parameters ---
			int dateParamIndex = 0;
			foreach (string paramName in expectedParamNames)
			{
				string dapperName = paramName.Substring(1); // Nombre sin '@' para Dapper

				// Asignación de Fechas
				if (paramName.Contains("fecha", StringComparison.OrdinalIgnoreCase))
				{
					DateTime? dateValue = null;
					if (paramDesde && paramHasta) dateValue = (dateParamIndex++ == 0) ? parametrosUsuario.FechaDesde : parametrosUsuario.FechaHasta;
					else if (paramHasta) dateValue = parametrosUsuario.FechaHasta;
					else if (paramDesde) dateValue = parametrosUsuario.FechaDesde;

					if (dateValue.HasValue) dapperParams.Add(dapperName, dateValue.Value.ToString("yyyy-MM-dd"));
				}
				// Asignación de Producto/Segmento
				else if (paramName.Contains("producto", StringComparison.OrdinalIgnoreCase))
				{
					if (idCartera == 5 && idReporte == 21 && !string.IsNullOrEmpty(parametrosUsuario.Segmento))
					{
						int valorSegmento = parametrosUsuario.Segmento.Equals("Castigo", StringComparison.OrdinalIgnoreCase) ? 10 : 40;
						dapperParams.Add(dapperName, valorSegmento);
					}
					else if (paramProducto)
					{
						dapperParams.Add(dapperName, parametrosUsuario.IdProducto);
					}
				}
				// Añadir lógica para otros parámetros
			}

			// Parámetro de salida
			if (nombresTabla && esSP)
			{
				dapperParams.Add("NombresParam", dbType: DbType.String, direction: ParameterDirection.Output, size: 8000);
			}

			// --- 3. Determinar SQL final y CommandType ---
			if (esSP)
			{
				sqlFinal = nombreCalificado; // [Schema].[NombreSP]
				commandTypeFinal = CommandType.StoredProcedure;
			}
			else // Es Función
			{
				sqlBuilder.Append($"SELECT * FROM {nombreCalificado}("); // [Schema].[NombreFn]
				sqlBuilder.Append(string.Join(", ", expectedParamNames)); // (@param1, @param2...)
				sqlBuilder.Append(')');
				sqlFinal = sqlBuilder.ToString();
				commandTypeFinal = CommandType.Text;
			}

			int commandTimeoutSeconds = 1800;
			// --- 4. Ejecutar y Procesar Resultados ---
			var resultados = new Dictionary<string, IEnumerable<dynamic>>();
			using (var multi = await connection.QueryMultipleAsync(
				sqlFinal,
				dapperParams,
				commandType: commandTypeFinal,
				commandTimeout: commandTimeoutSeconds
				))
			{
				int tableIndex = 0;
				string[] nombresTablaArray = (nombresTabla && esSP) ? dapperParams.Get<string>("NombresParam")?.Split('|') ?? Array.Empty<string>() : Array.Empty<string>();

				while (!multi.IsConsumed)
				{
					var tablaActual = await multi.ReadAsync<dynamic>();
					if (tablaActual.Any())
					{
						string nombreTabla = (nombresTablaArray.Length > tableIndex && !string.IsNullOrWhiteSpace(nombresTablaArray[tableIndex]))
												? nombresTablaArray[tableIndex].Trim()
												: $"Tabla{tableIndex + 1}";
						resultados.Add(nombreTabla, tablaActual);
					}
					tableIndex++;
				}
			}
			return resultados;
			// La conexión se cierra aquí
		}


		/// <summary>
		/// Obtiene los nombres de los parámetros de un SP o Función desde los metadatos de SQL Server.
		/// </summary>
		private async Task<List<string>> GetRoutineParameterNamesAsync(SqlConnection connection, string schema, string routineName)
		{
			// Limpiamos corchetes aquí también por seguridad
			routineName = routineName.Replace("[", "").Replace("]", "");
			string sql = @"
                SELECT PARAMETER_NAME
                FROM INFORMATION_SCHEMA.PARAMETERS
                WHERE SPECIFIC_SCHEMA = @SchemaName
                  AND SPECIFIC_NAME = @RoutineName
                  AND PARAMETER_MODE = 'IN' -- Solo parámetros de entrada
                ORDER BY ORDINAL_POSITION;
            ";
			var parameters = await connection.QueryAsync<string>(sql, new { SchemaName = schema, RoutineName = routineName });
			return parameters.ToList();
		}
	}
}