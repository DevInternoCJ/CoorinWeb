using Loki.Mark.Administracion.Campanias.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Encargados.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Administracion.Ejecutivos.Encargados.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EncargadosController : ControllerBase
	{
		private readonly IEncargadosService _encargadosService;

		public EncargadosController(IEncargadosService encargadosService)
		{
			_encargadosService = encargadosService;
		}


		[HttpPost("encargados")]
		[SwaggerOperation(
			Summary = "Encargados",
			Description = "Devuelve todos los encargados del servidor actual."
		)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> AllEncargados()
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			var encargados = await _encargadosService.GetAllEncargados(servidorClaim);
			if (encargados == null || encargados.Count == 0)
			{
				return NotFound(new { error = "No se encontraron encargados." });
			}
			return Ok(encargados);
		}

		[HttpPost("ejecutivos-propios/{idEjecutivo}")]
		[SwaggerOperation(
			Summary = "Jerarquía de Ejecutivos Propios",
			Description = "Genera el arbol de jerarquías de los ejecutivos propios del idEjecutivo provisto."
		)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> EjecutivosPropios(int idEjecutivo)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			var encargados = await _encargadosService.JerarquiaEjecutivosPropios(servidorClaim, idEjecutivo);
			if (encargados == null || encargados.Count == 0)
			{
				return NotFound(new { error = "No se pudo generar la jerarquía de ejecutivos propios." });
			}
			return Ok(encargados);
		}

	}
}
