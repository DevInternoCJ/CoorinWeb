using CoorinWeb.Loki.DTOs.AuthDTOs;
using Loki.DTOs.CampaniasDTOs;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;


namespace Loki.Mark.Administracion.Campanias.Controllers
{


	[ApiController]
	[Route("api/campañas")]
	public class CampaniasController : ControllerBase
	{
		private readonly ICampaniasService _campaniasService;
		private readonly ICampaniasDao _campaniasDao;

		public CampaniasController(ICampaniasService campaniasService, ICampaniasDao campaniasDao)
		{
			_campaniasService = campaniasService;
			_campaniasDao = campaniasDao;
		}

		[HttpGet("carteras")]
		[SwaggerOperation(
			Summary = "Carteras",
			Description = "Devuelve todas las carteras del servidor donde se haya iniciado sesión."
		)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> Carteras()
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			var cuentas = await _campaniasService.GetCarteras(servidorClaim);

			if (cuentas == null || cuentas.Count == 0)
			{
				return NotFound(new { error = "No se encontraron cuentas." });
			}
			return Ok(cuentas);
		}

		[HttpGet("carteras-productos")]
		[SwaggerOperation(
			Summary = "Carteras productos",
			Description = "Devuelve todas las carteras activas actualmente en el servidor."
		)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetCuentasProductos()
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			var cuentas = await _campaniasService.GetCarterasProductos(servidorClaim);
			if (cuentas == null || cuentas.Count == 0)
			{
				return NotFound(new { error = "No se encontraron cuentas." });
			}
			return Ok(cuentas);
		}


		[HttpGet("campañas-encargado/{idEncargado}/{idCartera}/{idProducto}")]
		[SwaggerOperation(
			Summary = "Campañas del Encargado",
			Description = "Obtiene las campañas del encargado según la cartera y producto al que pertenezca."
		)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> CampaniasPorEncargado(
			int? idEncargado,
			short? idCartera,
			short? idProducto)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			var campañas = await _campaniasDao.GetCampañasEncargado(servidorClaim, idEncargado, idCartera, idProducto);

			if (campañas == null || campañas.Count == 0)
			{
				return NotFound(); // Devuelve 404 si no se encontraron campañas
			}

			return Ok(campañas); // Devuelve 200 OK con la lista de campañas
		}

		[HttpPatch("habilitar-deshabilitar/{idCampaña}")]
		[AllowAnonymous]
		[SwaggerOperation(
			Summary = "Habilitar/Deshabilitar Campañas",
			Description = "Permite elegir qué campañas están activas en el servidor respectivo."
		)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<ActionResult<List<dynamic>>> PatchHabilitarDeshabilitarCampania(short idCampaña, [FromBody] EncenderApagarDTO dto)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			var resultado = await _campaniasDao.PatchEnciendeApagaCampañas(servidorClaim, idCampaña, dto.Encender);

			if (resultado == null) // O alguna otra condición que indique fallo
			{
				return NotFound(); // O StatusCode(500, "Error al actualizar la campaña"); según tu lógica
			}

			return Ok(resultado); // O NoContent() si no necesitas devolver nada más
		}


	}
}
