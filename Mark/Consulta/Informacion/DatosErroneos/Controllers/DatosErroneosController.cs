using Loki.DTOs.Informacion.DatosErroneos;
using Loki.DTOs.Informacion.DatosErroneosDTOs;
using Loki.Mark.Consulta.Informacion.DatosErroneos.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Informacion.DatosErroneos.Controllers
{
	[Authorize]
	[Route("api/informacion/[controller]")]
    [Tags("Consulta - DatosErroneos")]
    [ApiController]
	public class DatosErroneosController : ControllerBase
	{
		private readonly IDatosErroneosService _service;

		public DatosErroneosController(IDatosErroneosService service)
		{
			_service = service;
		}

		[HttpPost("consultar")]
		[SwaggerOperation(
			Summary = "Consultar Datos Erróneos - Yoshi",
			Description = "Obtiene una lista de los datos reportados como erróneos por los ejecutivos en un rango de fechas para una cartera específica. " +
			"El IdDatoErroneo se debe obtener desde el endpoint valores-catalogo con un idCatalogo = 18."
		)]
		[ProducesResponseType(typeof(IEnumerable<DatoErroneoDto>), 200)]
		public async Task<IActionResult> Consultar([FromBody] DatosErroneosRequestDto request)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			//string? servidorClaim = "Albaz";

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });
			}

			var resultados = await _service.ConsultarDatosErroneosAsync(servidorClaim, request);

			if (!resultados.Any())
			{
				return NotFound(new { mensaje = "No se encontraron registros para los Datos Erróneos." });
			}

			return Ok(resultados);
		}
	}
}
