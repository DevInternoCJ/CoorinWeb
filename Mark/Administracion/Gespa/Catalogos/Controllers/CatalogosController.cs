using Loki.Mark.Administracion.Gespa.Catalogos.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Administracion.Gespa.Catalogos.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CatalogosController : ControllerBase
	{
		private readonly ICatalogosService _catalogosService;
		public CatalogosController(ICatalogosService catalogosService)
		{
			_catalogosService = catalogosService;
		}

		[HttpGet("catalogos")]
		[SwaggerOperation(
			Summary = "Catálogos",
			Description = "Devuelve todos los registros de la tabla 'Catálogos', proyectando únicamente los campos con alias 'idCatalogo', 'catálogo' y 'descripción'."
		)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetCatalogos()
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			var catalogos = await _catalogosService.GetAllCatalogos(servidorClaim);

			if (catalogos == null || catalogos.Count == 0)
			{
				return NotFound(new { error = "No se encontró la lista de los catálogos." });
			}
			return Ok(catalogos);
		}

		[HttpGet("valores-catalogo")]
		[SwaggerOperation(
			Summary = "Valores Catálogo",
			Description = "Devuelve todos registros de la tabla 'ValoresCatálogo', proyectando únicamente los campos 'idValor','idCatálogo','valor' y 'detalle'."
		)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetValoresCatalogos()
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			var valoresCatalogos = await _catalogosService.GetAllValoresCatalogos(servidorClaim);

			if (valoresCatalogos == null || valoresCatalogos.Count == 0)
			{
				return NotFound(new { error = "No se encontró la lista de valores catálogos." });
			}
			return Ok(valoresCatalogos);
		}

	}
}
