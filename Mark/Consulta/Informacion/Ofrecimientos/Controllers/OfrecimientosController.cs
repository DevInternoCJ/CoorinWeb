using Loki.DTOs.Informacion.OfrecimientosDTOs;
using Loki.DTOs.Informacion.PagosDTOs;
using Loki.Mark.Consulta.Informacion.Ofrecimientos.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Informacion.Ofrecimientos.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/informacion/[controller]")]
    [Tags("Consulta - Ofrecimientos")]
    public class OfrecimientosController : ControllerBase
	{
		private readonly IOfrecimientosService _service;

		public OfrecimientosController(IOfrecimientosService service)
		{
			_service = service;
		}

		[HttpPost("consultar")]
		[SwaggerOperation(
			Summary = "Consultar Ofrecimientos de Herramientas - Yoshi",
			Description = "Obtiene un historial de los ofrecimientos de herramientas a cuentas en un rango de fechas, con la opción de aplicar filtros de cuentas dinámicas."
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

			var resultados = await _service.ConsultarOfrecimientosAsync(servidorClaim, request);
			return Ok(resultados);
		}
	}
}