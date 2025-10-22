// Ubicación: /Mark/Reportes/Cliente/Controllers/ReportesClienteController.cs
using Loki.DTOs.Reportes.ClienteDTOs;
using Loki.Mark.Reportes.Cliente.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Reportes.Cliente.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/reportes-cliente")]
	[SwaggerTag("Reportes al Cliente")] // Mantenemos el tag simple
	public class ReportesClienteController : ControllerBase
	{
		private readonly IReportesClienteService _service;

		public ReportesClienteController(IReportesClienteService service)
		{
			_service = service;
		}

		[HttpGet("definiciones")]
		[SwaggerOperation(
			Summary = "Obtener Definiciones de Reportes - Yoshi",
			Description = "Devuelve la lista de reportes disponibles y los parámetros que requiere cada uno.")]
		[ProducesResponseType(typeof(IEnumerable<ReporteDefinicionDto>), 200)]
		[AllowAnonymous]
		public async Task<IActionResult> GetDefiniciones()
		{
			//string? servidorClaim = User.FindFirst("Servidor")?.Value;
			string? servidorClaim = "Albaz";

			if (string.IsNullOrWhiteSpace(servidorClaim))
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });

			var definiciones = await _service.GetReporteDefinicionesAsync(servidorClaim);
			return Ok(definiciones);
		}

		[HttpPost("generar")]
		[SwaggerOperation(
			Summary = "Generar Reporte al Cliente  Yoshi",
			Description = "Ejecuta el reporte seleccionado con los parámetros proporcionados y devuelve los resultados.")]
		[ProducesResponseType(typeof(Dictionary<string, IEnumerable<dynamic>>), 200)]
		[ProducesResponseType(typeof(object), 404)]
		[ProducesResponseType(typeof(object), 400)]
		[AllowAnonymous]
		public async Task<IActionResult> GenerarReporte([FromBody] GenerarReporteRequestDto request)
		{
			//string? servidorClaim = User.FindFirst("Servidor")?.Value;
			string? servidorClaim = "Albaz";

			if (string.IsNullOrWhiteSpace(servidorClaim))
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });


			var resultados = await _service.GenerarReporteAsync(servidorClaim, request);

			if (resultados == null || resultados.Count == 0 || resultados.All(kvp => !kvp.Value.Any()))
			{
				return NotFound(new { message = "El reporte se generó sin registros para los parámetros especificados." });
			}

			return Ok(resultados);

		}
	}
}