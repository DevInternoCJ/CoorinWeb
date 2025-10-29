// Ubicación: /Mark/Reportes/Cliente/Controllers/ReportesClienteController.cs
using Loki.DTOs.Reportes.ClienteDTOs;
using Loki.Mark.Reportes.Cliente.Services;
using Loki.SwaggerExamples.Reportes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.Filters;

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
            Summary = "Obtener Definiciones de Reportes Disponibles",
            Description = @"Obtiene la lista de reportes configurados que el usuario puede generar. 
                    *Nota para Frontend*: La respuesta incluye flags booleanos (requiereProducto, requiereDesde, requiereHasta) 
                    que indican qué controles de filtro deben mostrarse al usuario para cada reporte seleccionado."
        )]
        [ProducesResponseType(typeof(IEnumerable<ReporteDefinicionDto>), 200)]
		public async Task<IActionResult> GetDefiniciones()
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			//string? servidorClaim = "Albaz";

			if (string.IsNullOrWhiteSpace(servidorClaim))
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });

			var definiciones = await _service.GetReporteDefinicionesAsync(servidorClaim);
			return Ok(definiciones);
		}

		[HttpPost("generar")]
        [SwaggerOperation(
                    Summary = "Generar Reporte al Cliente",
                    Description = @"Ejecuta el reporte seleccionado con los parámetros proporcionados y devuelve los resultados (potencialmente múltiples tablas).
                            *Nota para Frontend: El cuerpo de la petición (GenerarReporteRequestDto) debe incluir **todos* los parámetros posibles (idProducto, fechaDesde, fechaHasta, segmento, etc.), 
                            enviando null para aquellos que no apliquen según la definición del reporte obtenida en /definiciones. 
                            Para reportes que requieren *una sola fecha* (donde requiereHasta es true pero requiereDesde es false), 
                            enviar la fecha seleccionada por el usuario en *ambos* campos: fechaDesde y fechaHasta."
                )]
        [ProducesResponseType(typeof(Dictionary<string, IEnumerable<dynamic>>), 200)]
		[ProducesResponseType(typeof(object), 404)]
		[ProducesResponseType(typeof(object), 400)]
		[SwaggerRequestExample(typeof(GenerarReporteRequestDto), typeof(GenerarReporteExamples))]
		public async Task<IActionResult> GenerarReporte([FromBody] GenerarReporteRequestDto request)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			//string? servidorClaim = "Albaz";

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