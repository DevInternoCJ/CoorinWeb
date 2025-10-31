using Loki.DTOs.Informacion.PagosDTOs;
using Loki.DTOs.Informacion.PagosReportadosDTOs;
using Loki.Mark.Consulta.Informacion.PagosReportados.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Informacion.PagosReportados.Controllers
{
	[Authorize]
	[Route("api/informacion/[controller]")]
	[ApiController]
	public class PagosReportadosController : ControllerBase
	{
		private readonly IPagosReportadosService _service;

		public PagosReportadosController(IPagosReportadosService service)
		{
			_service = service;
		}

		[HttpPost("consultar")]
		[SwaggerOperation(
			Summary = "Consultar Pagos Reportados - Yoshi",
			Description = "Obtiene una lista de los pagos reportados en un rango de fechas, permitiendo aplicar filtros dinámicos basados en un ID de consulta predefinido."
		)]
		[ProducesResponseType(typeof(IEnumerable<dynamic>), 200)]
		public async Task<IActionResult> Consultar([FromBody] ConsultaPagosRequest request)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			//string? servidorClaim = "Albaz";

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });
			}

			var resultados = await _service.ConsultarPagosReportadosAsync(servidorClaim, request);

			if (!resultados.Any())
			{
				return NotFound(new { mensaje = "No se encontraron registros para los pagos reportados." });
			}
			return Ok(resultados);
		}
	}
}
