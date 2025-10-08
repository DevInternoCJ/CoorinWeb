using Loki.DTOs.EncargadosDTOs;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Encargados.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;

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


		[HttpGet("encargados")]
		[SwaggerOperation(
			Summary = "Encargados - Yoshi",
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

		[HttpGet("ejecutivos-propios/{idEjecutivo}")]
		[SwaggerOperation(
			Summary = "Jerarquía de Ejecutivos Propios - Yoshi",
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

		[HttpPatch("asignar-encargado-cartera")]
		[SwaggerOperation(
			Summary = "Asignar Encargado/Cartera - Yoshi",
			Description = "Asigna un encargado y modifica su cartera y/o producto a uno o más ejecutivos. El resultado detalla el éxito o fracaso de cada asignación."
		)]
		[ProducesResponseType(typeof(List<ResultadoAsignacionDto>), StatusCodes.Status200OK)]
		[ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> CambiaEncargadoEjecutivo([FromBody] List<CambiaEncargadoDto> listaEjecutivo)
		{
			var servidorClaim = User.FindFirst("Servidor")?.Value;
			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			// El servicio ahora devuelve nuestra lista de DTOs con detalles
			var resultados = await _encargadosService.CambiarEncargado(servidorClaim, listaEjecutivo);

			// Verificamos si TODAS las operaciones fallaron
			bool todasFallaron = resultados.All(r => !r.Exito);
			if (todasFallaron)
			{
				// Devolvemos un 400 con un resumen y los detalles de cada error.
				return BadRequest(new { error = "Ninguna de las asignaciones pudo completarse.", detalles = resultados });
			}

			// Para éxito total o parcial, devolvemos 200 OK.
			// El cliente puede inspeccionar la lista para ver los detalles de cada operación.
			return Ok(resultados);
		}
	}
}