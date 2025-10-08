using System;
using System.Data;
using System.Collections;
using System.IO;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;

using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Common;
using Loki.Global; // Asumiendo que ExcelGeneratorService está aquí
using static CoorinWeb.Loki.Global.AccionamientosQueryHelper; // Para SqlQueryData y Ejecutivo1

namespace TuAplicacion.Services
{
	public class ReporteGeneradorService
	{
		private readonly ExcelGeneratorService _excelGenerator;
		private readonly IDbContextFactory _dbContextFactory;

		// Servidor ahora es un campo fijo de la clase.
		private const string _servidorPrincipal = "thor";

		public ReporteGeneradorService(IDbContextFactory dbContextFactory)
		{
			_excelGenerator = new ExcelGeneratorService();
			_dbContextFactory = dbContextFactory;
		}

		/// <summary>
		/// Genera un reporte basado en el tipo de consulta seleccionada y los parámetros,
		/// y lo devuelve como un MemoryStream de un archivo Excel.
		/// </summary>
		/// <param name="tipoReporte">Define qué tipo de consulta se realizará (ej. "Cuentas", "Pagos", "Accionamientos").</param>
		/// <param name="parametrosConsulta">Un diccionario que contenga los parámetros necesarios para la consulta.</param>
		/// <param name="sheetName">Nombre de la hoja del Excel. Por defecto es "Datos".</param>
		/// <returns>Un MemoryStream con el contenido del archivo Excel, o null si falla.</returns>
		public MemoryStream? GenerarReporteExcelStream(string tipoReporte, Dictionary<string, object> parametrosConsulta, string sheetName = "Datos")
		{
			string sqlQuery = string.Empty;
			ArrayList columnasResultantes = new ArrayList();
			DataTable resultadosDataTable = null;

			// tipoBase se determina con el switch, servidor es fijo.
			string tipoBase = string.Empty;

			switch (tipoReporte.ToLower())
			{
				case "cuentas":
					tipoBase = "collection";
					break;
				case "pagos":
					tipoBase = "history";
					break;
				case "accionamientos":
					tipoBase = "memory";
					break;
				// Añade más casos aquí para tus otros tipos de reporte, asignando solo el tipoBase correcto.

				default:
					Console.WriteLine($"Tipo de reporte '{tipoReporte}' no soportado o sin configuración de base de datos.");
					return null;
			}

			// Validar que se haya establecido tipoBase.
			if (string.IsNullOrEmpty(tipoBase))
			{
				Console.WriteLine($"Error interno: No se pudo determinar el tipo de base de datos para el reporte '{tipoReporte}'.");
				return null;
			}

			// Paso 1: Determinar y generar la consulta SQL según el tipo de reporte
			switch (tipoReporte.ToLower())
			{
				case "cuentas":
					if (!parametrosConsulta.ContainsKey("IdConsulta") || !parametrosConsulta.ContainsKey("IdProducto") ||
						!parametrosConsulta.ContainsKey("IdCartera") || !parametrosConsulta.ContainsKey("Desde"))
					{
						Console.WriteLine("Parámetros incompletos para reporte de cuentas.");
						return null;
					}

					int idConsultaCuentas = Convert.ToInt32(parametrosConsulta["IdConsulta"]);
					int idProductoCuentas = Convert.ToInt32(parametrosConsulta["IdProducto"]);
					int idCarteraCuentas = Convert.ToInt32(parametrosConsulta["IdCartera"]);
					DateTime desdeCuentas = Convert.ToDateTime(parametrosConsulta["Desde"]);

					SqlQueryData queryDataCuentas =
						ConsultaGenerador.GeneraQueryCuentas(
							idProductoCuentas,
							Ejecutivo1.TablaParámetros,
							Ejecutivo1.TablaAgrupar,
							Resultado.Cuentas, // Asegúrate de que Resultado.Cuentas sea accesible aquí
							desdeCuentas,
							idCarteraCuentas,
							ref columnasResultantes
						);
					sqlQuery = queryDataCuentas.Query;
					break;

				case "pagos":
					if (!parametrosConsulta.ContainsKey("IdCartera") || !parametrosConsulta.ContainsKey("Desde") ||
						!parametrosConsulta.ContainsKey("Hasta") || !parametrosConsulta.ContainsKey("IdConsulta"))
					{
						Console.WriteLine("Parámetros incompletos para reporte de pagos.");
						return null;
					}
					int idCarteraPagos = Convert.ToInt32(parametrosConsulta["IdCartera"]);
					DateTime desdePagos = Convert.ToDateTime(parametrosConsulta["Desde"]);
					DateTime hastaPagos = Convert.ToDateTime(parametrosConsulta["Hasta"]);
					int idConsultaPagos = Convert.ToInt32(parametrosConsulta["IdConsulta"]);
					sqlQuery = ConsultaGenerador.QueryPagos(idCarteraPagos, desdePagos, hastaPagos, idConsultaPagos);
					break;

				case "accionamientos":
					if (!parametrosConsulta.ContainsKey("IdCartera") || !parametrosConsulta.ContainsKey("IdConsulta") ||
						!parametrosConsulta.ContainsKey("Conteo") || !parametrosConsulta.ContainsKey("Desde") ||
						!parametrosConsulta.ContainsKey("Hasta") || !parametrosConsulta.ContainsKey("Base") ||
						!parametrosConsulta.ContainsKey("IdAcercamiento"))
					{
						Console.WriteLine("Parámetros incompletos para reporte de accionamientos.");
						return null;
					}
					int idCarteraAccionamientos = Convert.ToInt32(parametrosConsulta["IdCartera"]);
					int idConsultaAccionamientos = Convert.ToInt32(parametrosConsulta["IdConsulta"]);
					Resultado conteoAccionamientos = (Resultado)parametrosConsulta["Conteo"];
					DateTime desdeAccionamientos = Convert.ToDateTime(parametrosConsulta["Desde"]);
					DateTime hastaAccionamientos = Convert.ToDateTime(parametrosConsulta["Hasta"]);
					string baseAccionamientos = parametrosConsulta["Base"].ToString();
					int idAcercamientoAccionamientos = Convert.ToInt32(parametrosConsulta["IdAcercamiento"]);

					sqlQuery = ConsultaGenerador.QueryAccionamientos(
						idCarteraAccionamientos,
						idConsultaAccionamientos,
						conteoAccionamientos,
						desdeAccionamientos,
						hastaAccionamientos,
						baseAccionamientos,
						idAcercamientoAccionamientos
					);
					break;

				default:
					Console.WriteLine($"Tipo de reporte '{tipoReporte}' no soportado.");
					return null;
			}

			// Paso 2: Ejecutar la consulta SQL y obtener los resultados en un DataTable
			try
			{
				Console.WriteLine($"Ejecutando la siguiente consulta SQL en {_servidorPrincipal}/{tipoBase}:\n{sqlQuery}");
				resultadosDataTable = ObtenerDatosDeBaseDeDatos(sqlQuery, _servidorPrincipal, tipoBase);
			}
			catch (Exception dbEx)
			{
				// ***** CAMBIO CRÍTICO AQUÍ: Relanzamos la excepción con un mensaje más específico *****
				Console.Error.WriteLine($"Error al ejecutar la consulta SQL: {dbEx.Message}");
				throw new ApplicationException($"Error al ejecutar la consulta para el reporte '{tipoReporte}': {dbEx.Message}", dbEx);
			}

			// Paso 3: Generar el archivo Excel a partir del DataTable
			if (resultadosDataTable != null && resultadosDataTable.Rows.Count > 0)
			{
				return _excelGenerator.ExportToExcelStream(resultadosDataTable, sheetName);
			}
			else
			{
				Console.WriteLine("No se encontraron datos para generar el reporte Excel.");
				return null; // Retorna null si no hay datos para generar el reporte
			}
		}

		/// <summary>
		/// Implementación real para obtener datos de la base de datos usando IDbContextFactory.
		/// </summary>
		private DataTable ObtenerDatosDeBaseDeDatos(string query, string servidor, string tipoBase)
		{
			DataTable dt = new DataTable();
			using (SqlConnection connection = _dbContextFactory.GetSqlConnection(servidor, tipoBase))
			{
				using (SqlCommand command = new SqlCommand(query, connection))
				{
					try
					{
						connection.Open();
						using (SqlDataAdapter adapter = new SqlDataAdapter(command))
						{
							adapter.Fill(dt);
						}
					}
					catch (Exception ex)
					{
						Console.Error.WriteLine($"Error al ejecutar la consulta SQL '{query}' en {servidor}/{tipoBase}: {ex.Message}");
						throw; // Re-lanza la excepción para que sea capturada en GenerarReporteExcelStream
					}
				}
			}
			return dt;
		}
	}
}