using CoorinWeb.Loki.Global;
using Loki.DTOs.CampaniasDTOs;
using Loki.DTOs.EjecutivosDTO;

using Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Administracion.Metas.Controllers
{


	[ApiController]
	[Route("api/carteras")]
    [Tags("Administración - Metas")]
    [Authorize]
	public class MetasController : ControllerBase
	{
		private readonly IMetasService _metasService;
		private readonly IMetasDAOs _metasDao;
		private readonly IDbContextFactory _dbContFactory;


		public MetasController(IMetasService metasService, IMetasDAOs metasDao, IDbContextFactory contextfactory)
		{
			_metasService = metasService;
			_metasDao = metasDao;

			_dbContFactory = contextfactory;
		}


		[HttpPost("metas-productividad")]
		[SwaggerOperation(
			Summary = "Metas Productividad - Irene",
			Description = "Obtiene las metas completas de productividad del ejecutivo incluyendo todos los campos." +
			"Nota: Insertar como parámetro en el JSON el idEjecutivo."
		)]
		public async Task<ActionResult<IEnumerable<ProductividadDTO>>> ObtenerMetasCompleto(
		[FromBody] List<int> ejecutivoIdsPropios)
		{
			if (ejecutivoIdsPropios == null || !ejecutivoIdsPropios.Any())
			{
				return BadRequest(new { error = "La lista de IDs de ejecutivos no puede estar vacía." });
			}

			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			try
			{
				var resultados = await _metasService.ObtenerMetasEjecutivos(servidorClaim, ejecutivoIdsPropios);

				if (resultados == null || !resultados.Any())
				{
					return NotFound(new
					{
						error = "No se encontraron metas para los ejecutivos proporcionados.",
						ejecutivosSolicitados = ejecutivoIdsPropios
					});
				}

				// Modificado: Retornar directamente el array de resultados
				return Ok(resultados);
			}
			catch (Exception ex)
			{
				//_logger.LogError(ex, "Error al obtener metas completas para ejecutivos: {EjecutivoIds}",
				string.Join(", ", ejecutivoIdsPropios);

				return StatusCode(500, new
				{
					error = "Error interno del servidor al obtener las metas",
					details = ex.Message
				});
			}
		}


		[HttpPost("establecer-metasproductividad")]
		[SwaggerOperation(
			Summary = "Establecer Metas Productividad - Irene",
			Description = "Define datos para la meta del ejecutivo."
			)]
		public async Task<IActionResult> EstablecerMetasEjecutivos([FromBody] EjecutivosMetasDto model)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { errors = "Datos de entrada inválidos." });
			}

			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return BadRequest(new { errors = "No se encontró el claim 'Servidor' en el token." });
			}

			var result = await _metasDao.EstableceMetaEjecutivo(model, servidorClaim);

			if (result.Result is NotFoundObjectResult notFoundResult)
			{
				return notFoundResult;
			}

			if (result.Result is OkObjectResult okResult)
			{

				dynamic daoResponse = okResult.Value;
				if (daoResponse != null && daoResponse.success)
				{
					return Ok(new
					{
						//success = true,
						message = "Meta de ejecutivo guardada exitosamente.",
						//affectedRows = daoResponse.affectedRows
					});
				}
			}

			return StatusCode(500, new { errors = "Error al guardar la meta del ejecutivo." });
		}
	}
}


