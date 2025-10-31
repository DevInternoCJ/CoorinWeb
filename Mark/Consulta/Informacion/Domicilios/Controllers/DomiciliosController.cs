using Loki.DTOs.Informacion.DomicilioDTOs;
using Loki.DTOs.Informacion.PagosDTOs;
using Loki.Mark.Consulta.Informacion.Domicilios.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Informacion.Domicilios.Controllers
{
	[Authorize]
	[Route("api/informacion/[controller]")]
	[ApiController]
	public class DomiciliosController : ControllerBase
	{
		private readonly IDomiciliosService _service;

		public DomiciliosController(IDomiciliosService service)
		{
			_service = service;
		}

		[HttpGet("consultar")]
		[SwaggerOperation(
			Summary = "Consultar Domicilios - Yoshi",
			Description = "Obtiene una lista de domicilios para una cartera, con la opción de aplicar filtros de cuentas dinámicas basadas en un ID de consulta predefinido."
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

			var resultados = await _service.ConsultarDomiciliosAsync(servidorClaim, idCartera, idConsulta);

			if (!resultados.Any())
			{
				return NotFound(new { mensaje = "No se encontraron registros para los Domicilios." });
			}

			return Ok(resultados);
		}
	}
}
