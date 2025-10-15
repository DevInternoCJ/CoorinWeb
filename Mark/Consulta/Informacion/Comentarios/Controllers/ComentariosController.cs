// En: /Mark/Consulta/Informacion/Comentarios/Controllers/ComentariosController.cs
using Loki.DTOs.Informacion.ComentariosDTOs;
using Loki.DTOs.Informacion.PagosDTOs;
using Loki.Mark.Consulta.Informacion.Comentarios.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Informacion.Comentarios.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/informacion/[controller]")]
	public class ComentariosController : ControllerBase
	{
		private readonly IComentariosService _service;

		public ComentariosController(IComentariosService service)
		{
			_service = service;
		}

		[HttpPost("consultar")]
		[SwaggerOperation(
			Summary = "Consultar Comentarios de Cuentas - Yoshi",
			Description = "Obtiene un historial de los comentarios o notas registradas en las cuentas en un rango de fechas, con la opción de aplicar filtros de cuentas dinámicas."
		)]
		[ProducesResponseType(typeof(IEnumerable<ComentarioDto>), 200)]
		public async Task<IActionResult> Consultar([FromBody] ConsultaPagosRequest request)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });
			}

			var resultados = await _service.ConsultarComentariosAsync(servidorClaim, request);
			return Ok(resultados);
		}
	}
}