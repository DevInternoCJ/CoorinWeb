using Loki.DTOs.Informacion.CorreosDTOs;
using Loki.Mark.Consulta.Informacion.Correos.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Informacion.Correos.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/informacion/[controller]")]
	public class CorreosController : ControllerBase
	{
		private readonly ICorreosService _service;

		public CorreosController(ICorreosService service)
		{
			_service = service;
		}

		[HttpGet("consultar")]
		[SwaggerOperation(
			Summary = "Consultar Correos de Cartera - Yoshi",
			Description = "Obtiene una lista de correos para una cartera, con la opción de aplicar filtros de cuentas dinámicas basadas en un ID de consulta predefinido."
		)]
		[ProducesResponseType(typeof(IEnumerable<dynamic>), 200)]
		public async Task<IActionResult> Consultar([FromQuery] int idCartera, [FromQuery] int idConsulta)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			//string? servidorClaim = "Albaz";

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });
			}

			var resultados = await _service.ConsultarCorreosAsync(servidorClaim, idCartera, idConsulta);


			if (!resultados.Any())
			{
				return NotFound(new { mensaje = "No se encontraron registros para los Correos de Cartera ." });
			}
			return Ok(resultados);
		}
	}
}