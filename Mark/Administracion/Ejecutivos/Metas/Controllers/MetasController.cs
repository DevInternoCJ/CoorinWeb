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
            Summary = "Metas Productividad",
            Description = "obtiene las metas de productividad del ejecutivo." +
            "Nota: Insertar como parametro en el json el idEjecutivo"
        )]
        public async Task<ActionResult<IEnumerable<ProductividadDTO>>> ObtenerMetas(
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

            var resultados = await _metasService.ObtenerMetasEjecutivos(servidorClaim, ejecutivoIdsPropios);

            if (resultados == null || !resultados.Any())
            {
                return NotFound(new { error = "No se encontraron metas para los ejecutivos proporcionados." });
            }

            return Ok(resultados);
        }
        [HttpPost("establecer-metasproductividad")]
        [SwaggerOperation(
            Summary = "Establecer metas productividad",
            Description = "Define datos para la meta del ejecutivo."
        )]
        [Authorize]
        public async Task<IActionResult> EstablecerMetasEjecutivos([FromBody] EjecutivosMetasDto model)
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

            int rowsAffected = await _metasDao.EstableceMetaEjecutivo(model, servidorClaim);

            if (rowsAffected > 0)
            {
                return Ok("Meta de ejecutivo guardada exitosamente.");
            }
            else
            {
                return StatusCode(500, "Error al guardar la meta del ejecutivo.");
            }
        }
    }
 }

       
