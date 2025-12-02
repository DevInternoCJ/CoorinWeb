using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System;
using TuAplicacion.Services;
using CoorinWeb.Loki.Common;

namespace TuAplicacion.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
    [Tags("Consulta - Reportes")]
    public class ReportesController : ControllerBase
	{
		private readonly ReporteGeneradorService _reporteGeneradorService;

		public ReportesController(ReporteGeneradorService reporteGeneradorService)
		{
			_reporteGeneradorService = reporteGeneradorService;
		}

		/// <summary>
		/// Endpoint para generar un reporte Excel.
		/// Ejemplo de URL: GET /api/Reportes/generar-excel?tipoReporte=cuentas&idConsulta=1&idProducto=101&idCartera=202&desde=2024-01-01
		/// </summary>
		[HttpGet("generar-excel")]
		public IActionResult GenerarReporteExcel(
			[FromQuery] string tipoReporte,
			[FromQuery] int idConsulta,
			[FromQuery] int idProducto,
			[FromQuery] int idCartera,
			[FromQuery] DateTime desde,
			[FromQuery] DateTime? hasta = null,
			[FromQuery] int? conteoValor = null,
			[FromQuery] string? baseParam = null,
			[FromQuery] int? idAcercamiento = null,
			[FromQuery] string sheetName = "Datos"
		)
		{
			try // ***** INICIO DEL BLOQUE TRY *****
			{
				var parametrosConsulta = new Dictionary<string, object>
				{
					{ "IdConsulta", idConsulta },
					{ "IdProducto", idProducto },
					{ "IdCartera", idCartera },
					{ "Desde", desde }
				};

				if (hasta.HasValue)
				{
					parametrosConsulta.Add("Hasta", hasta.Value);
				}
				if (conteoValor.HasValue)
				{
					if (Enum.IsDefined(typeof(Resultado), conteoValor.Value))
					{
						parametrosConsulta.Add("Conteo", (Resultado)conteoValor.Value);
					}
					else
					{
						return BadRequest("El valor proporcionado para 'conteo' no es válido.");
					}
				}
				if (!string.IsNullOrEmpty(baseParam))
				{
					parametrosConsulta.Add("Base", baseParam);
				}
				if (idAcercamiento.HasValue)
				{
					parametrosConsulta.Add("IdAcercamiento", idAcercamiento.Value);
				}

				MemoryStream? excelStream = _reporteGeneradorService.GenerarReporteExcelStream(
					tipoReporte,
					parametrosConsulta,
					sheetName
				);

				// Esta condición debería ser alcanzada solo si el servicio retorna null sin lanzar excepción,
				// lo cual ahora debería ser menos frecuente con los cambios anteriores.
				if (excelStream == null)
				{
					return BadRequest("No se pudo generar el reporte Excel debido a un problema desconocido.");
				}

				string fileName = $"Reporte_{tipoReporte}_{DateTime.Now:yyyyMMddHHmmss}.xlsx";
				string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

				return File(excelStream, contentType, fileName);
			}
			catch (ApplicationException appEx) // ***** CAPTURA EXCEPCIONES DE LA LÓGICA DE NEGOCIO/SERVICIO *****
			{
				// Este catch capturará las excepciones que relanza ReporteGeneradorService
				Console.Error.WriteLine($"Error de aplicación al generar reporte: {appEx.Message}");
				return BadRequest($"Error en el reporte: {appEx.Message}"); // Devuelve el mensaje específico
			}
			catch (Exception ex) // ***** CAPTURA CUALQUIER OTRA EXCEPCIÓN INESPERADA *****
			{
				Console.Error.WriteLine($"Error inesperado al generar reporte: {ex.Message}");
				return StatusCode(500, "Ocurrió un error inesperado al generar el reporte. Intente de nuevo más tarde.");
			}
		}

		// --- Endpoint con POST para parámetros en el cuerpo ---
		public class ReporteRequestModel
		{
			public string TipoReporte { get; set; } = string.Empty;
			public int IdConsulta { get; set; }
			public int IdProducto { get; set; }
			public int IdCartera { get; set; }
			public DateTime Desde { get; set; }
			public DateTime? Hasta { get; set; }
			public int? ConteoValor { get; set; }
			public string? Base { get; set; }
			public int? IdAcercamiento { get; set; }
			public string SheetName { get; set; } = "Datos";
		}

		[HttpPost("generar-excel-post")]
		public IActionResult GenerarReporteExcelPost([FromBody] ReporteRequestModel request)
		{
			try // ***** INICIO DEL BLOQUE TRY *****
			{
				var parametrosConsulta = new Dictionary<string, object>
				{
					{ "IdConsulta", request.IdConsulta },
					{ "IdProducto", request.IdProducto },
					{ "IdCartera", request.IdCartera },
					{ "Desde", request.Desde }
				};

				if (request.Hasta.HasValue)
				{
					parametrosConsulta.Add("Hasta", request.Hasta.Value);
				}
				if (request.ConteoValor.HasValue)
				{
					if (Enum.IsDefined(typeof(Resultado), request.ConteoValor.Value))
					{
						parametrosConsulta.Add("Conteo", (Resultado)request.ConteoValor.Value);
					}
					else
					{
						return BadRequest("El valor proporcionado para 'conteo' no es válido.");
					}
				}
				if (!string.IsNullOrEmpty(request.Base))
				{
					parametrosConsulta.Add("Base", request.Base);
				}
				if (request.IdAcercamiento.HasValue)
				{
					parametrosConsulta.Add("IdAcercamiento", request.IdAcercamiento.Value);
				}

				MemoryStream? excelStream = _reporteGeneradorService.GenerarReporteExcelStream(
					request.TipoReporte,
					parametrosConsulta,
					request.SheetName
				);

				if (excelStream == null)
				{
					return BadRequest("No se pudo generar el reporte Excel debido a un problema desconocido.");
				}

				string fileName = $"Reporte_{request.TipoReporte}_{DateTime.Now:yyyyMMddHHmmss}.xlsx";
				string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

				return File(excelStream, contentType, fileName);
			}
			catch (ApplicationException appEx) // ***** CAPTURA EXCEPCIONES DE LA LÓGICA DE NEGOCIO/SERVICIO *****
			{
				Console.Error.WriteLine($"Error de aplicación al generar reporte (POST): {appEx.Message}");
				return BadRequest($"Error en el reporte: {appEx.Message}");
			}
			catch (Exception ex) // ***** CAPTURA CUALQUIER OTRA EXCEPCIÓN INESPERADA *****
			{
				Console.Error.WriteLine($"Error inesperado al generar reporte (POST): {ex.Message}");
				return StatusCode(500, "Ocurrió un error inesperado al generar el reporte. Intente de nuevo más tarde.");
			}
		}
	}
}