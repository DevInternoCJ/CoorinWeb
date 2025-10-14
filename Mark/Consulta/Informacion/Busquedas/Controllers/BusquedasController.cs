using Loki.DTOs.Informacion.BusquedasDTOs;
using Loki.DTOs.Informacion.PagosDTOs;
using Loki.Mark.Consulta.Informacion.Busquedas.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Informacion.Busquedas.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/informacion/[controller]")]
	public class BusquedasController : ControllerBase
	{
		private readonly IBusquedasService _service;

		public BusquedasController(IBusquedasService service)
		{
			_service = service;
		}

		[HttpPost("consultar")]
		[SwaggerOperation(
			Summary = "Consultar Búsquedas de Cuentas",
			Description = "Obtiene un historial de las búsquedas de cuentas realizadas por los ejecutivos en un rango de fechas, con la opción de aplicar filtros de cuentas dinámicas."
		)]
		[ProducesResponseType(typeof(IEnumerable<BusquedaDto>), 200)]
		public async Task<IActionResult> Consultar([FromBody] ConsultaPagosRequest request)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });
			}

			var resultados = await _service.ConsultarBusquedasAsync(servidorClaim, request);
			return Ok(resultados);
		}
	}
}