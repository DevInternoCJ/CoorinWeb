using CoorinWeb.Loki.DTOs.AuthDTOs;
using Loki.DTOs.CampaniasDTOs;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;


namespace Loki.Mark.Administracion.Campanias.Controllers
{


	[ApiController]
	[Route("api/info-ejecutivo")]
	public class InfoEjecutivoController : ControllerBase
	{
		private readonly IInfoEjecutivoDao _infoEjecutivoDao;

		public InfoEjecutivoController(IInfoEjecutivoDao infoDao)
		{
			_infoEjecutivoDao = infoDao;
		}


		[HttpGet("consultas/{idEjecutivo}")]
		[SwaggerOperation(
			Summary = "Consultas del Ejecutivo",
			Description = "Obtiene las consultas generadas anteriormente por el ejecutivo seleccionado en el servidor escogido."
		)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[AllowAnonymous]
		public async Task<IActionResult> Consultas(int idEjecutivo)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			var consultas = await _infoEjecutivoDao.GetConsultasEjecutivo(servidorClaim, idEjecutivo);

			if (consultas == null || consultas.Count == 0)
			{
				return NotFound(); // Devuelve 404 si no se encontraron consultas.
			}

			return Ok(consultas); // Devuelve 200 OK con la lista de consultas.
		}

	}
}
