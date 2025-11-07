using CoorinWeb.Loki.Global;
using Loki.DTOs.GestionesDTOs;
using Loki.Mark.Procesos.Gestiones.Interfaces;
using Loki.Mark.Procesos.Procesos.Interfaces;
using Loki.Mark.Procesos.Procesos.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Gestiones.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GestionesController : ControllerBase
    {
        private readonly IDbContextFactory _dbContextFactory;
        private readonly IGestionesService _gestionesService;
        private readonly IGestionesDao _gestionesDao;
        public GestionesController(IDbContextFactory dbContextFactory, IGestionesService gestionesService, IGestionesDao gestionesDao)
        {
            _dbContextFactory = dbContextFactory;
            _gestionesService = gestionesService;
            _gestionesDao = gestionesDao;
        }

        [HttpGet("comentarios")]
        [Authorize]
        [SwaggerOperation(
          Summary = "comentarios - irene",
          Description = "obtiene una lista de comentarios"
      )]

        public async Task<IActionResult> getComentarios([FromQuery] int idCartera, string cuenta)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                var comentarios = await _gestionesService.buscaComentarios(servidorClaim, idCartera, cuenta);
                return Ok(comentarios);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener las frases", error = ex.Message });
            }
        }

        [HttpPut("actualiza-comentarios")]
        [Authorize]
        [SwaggerOperation(
            Summary = "Actualizar comentario",
            Description = "Actualiza un comentario existente en ambas bases de datos (principal e history)"
        )]
        public async Task<IActionResult> ActualizarComentario([FromBody] ActualizaComentarioRequest request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                var (success, message) = await _gestionesDao.actualizaComentario(servidorClaim, request);

                if (success)
                {
                    return Ok(new { message });
                }
                else
                {
                    return BadRequest(new { error = message });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al actualizar el comentario", error = ex.Message });
            }
        }
    }
}
