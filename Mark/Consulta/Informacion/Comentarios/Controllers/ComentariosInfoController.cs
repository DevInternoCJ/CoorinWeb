// En: /Mark/Consulta/Informacion/Comentarios/Controllers/ComentariosInfoController.cs
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
	[Route("api/informacion/comentarios-info")]
	public class ComentariosInfoController : ControllerBase
	{
		private readonly IComentariosInfoService _service;

		public ComentariosInfoController(IComentariosInfoService service)
		{
			_service = service;
		}

		[HttpPost("consultar")]
		[SwaggerOperation(
			Summary = "Consultar Comentarios de Cuentas - Yoshi",
			Description = "Obtiene un historial de los comentarios o notas registradas en las cuentas en un rango de fechas, con la opción de aplicar filtros de cuentas dinámicas."
		)]
		[ProducesResponseType(typeof(IEnumerable<dynamic>), 200)]
		public async Task<IActionResult> Consultar([FromBody] ConsultaPagosRequest request)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });
			}

			var resultados = await _service.ConsultarComentariosAsync(servidorClaim, request);

			if (!resultados.Any())
			{
				return NotFound(new { mensaje = "No se encontraron registros para los comentarios de cuentas." });
			}

			return Ok(resultados);
		}
	}
}