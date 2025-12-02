using Loki.DTOs.Reportes.EjecutivosDTOs;
using Loki.Mark.Reportes.Ejecutivos.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Reportes.Ejecutivos.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/reportes/[controller]")]
	[SwaggerTag("Endpoints para la generación de reportes de productividad y otros indicadores.")]
    [Tags("Reportes - ReporteEjecutivos")]
    public class ReporteEjecutivosController : ControllerBase
	{
		private readonly IReporteEjecutivosService _service;
		public ReporteEjecutivosController(IReporteEjecutivosService service) => _service = service;

		[HttpPost("consultar")]
		[SwaggerOperation(
			Summary = "Consultar Reporte de Productividad de Ejecutivos - Yoshi",
			Description = "Obtiene los indicadores de productividad para un grupo de ejecutivos en un rango de fechas, cartera y producto específicos."
		)]
		[AllowAnonymous]
		[ProducesResponseType(typeof(IEnumerable<ReporteEjecutivoDto>), 200)]
		public async Task<IActionResult> Consultar([FromBody] ReporteEjecutivosRequestDto request)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			//string? servidorClaim = "Albaz";

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });
			}

			var resultados = await _service.ConsultarReporteAsync(servidorClaim, request);

			if (resultados == null || !resultados.Any())
			{
				// Devolvemos un 404 Not Found con un mensaje claro.
				return NotFound(new { message = "No se encontraron registros para los criterios de búsqueda especificados." });
			}

			// Si hay resultados, devolvemos 200 OK con los datos.
			return Ok(resultados);
		}
	}
}