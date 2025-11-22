using CoorinWeb.Loki.Global;
using Loki.DTOs.GestionesDTOs;
using Loki.Mark.Procesos.Gestiones.Interfaces;
using Loki.Mark.Procesos.Procesos.Interfaces;
using Loki.Mark.Procesos.Procesos.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Data;

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


        #region Comentario
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
                return StatusCode(500, new { message = "Error al obtener los comentarios", error = ex.Message });
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

        #endregion

        #region Carga Gestiones Tel
        //carga llamadas

        #endregion

        #region Consulta gestiones tel
        [HttpGet("consulta-llamadas")]
        [Authorize]
        [SwaggerOperation(
          Summary = "consulta llamadas - Irene",
          Description = "Obtiene las gestiones por cartera y rango de fechas"
      )]

        public async Task<IActionResult> RealizaBusqueda(
        [FromQuery] int idCartera,
        [FromQuery] DateTime fechaInicial,
        [FromQuery] DateTime fechaFinal,
        [FromQuery] int jerarquia, 
        [FromQuery] int? idProducto = null)
        {
           
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
               
                var gestiones = await _gestionesService.RealizaBusqueda(
                    servidorClaim,
                    idCartera,
                    fechaInicial,
                    fechaFinal,
                    jerarquia,
                    idProducto
                );

                return Ok(gestiones);
            }
           
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(403, new { message = "Permisos insuficientes", error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener las gestiones", error = ex.Message });
            }
        }
        #endregion

        #region editar gestiones
        [HttpGet("gestiones-cuenta")]
        [Authorize]
        [SwaggerOperation(
          Summary = "consultar gestiones - Irene",
          Description = ""
      )]

        public async Task<IActionResult> GetGestionesCuenta([FromQuery] int idCartera, string idCuenta)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                var gestiones = await _gestionesService.buscarGestiones(servidorClaim, idCartera, idCuenta);
                return Ok(gestiones);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener las gestiones", error = ex.Message });


            }
        }
        [HttpPut("editar-gestiones")]
        [Authorize]
        [SwaggerOperation(
          Summary = "editar gestiones - Irene",
          Description = ""
      )]

        public async Task<IActionResult> EditarGestion([FromQuery] int idCartera, [FromQuery] string idCuenta, [FromQuery] DateTime fecha, [FromQuery] TimeSpan hora, [FromQuery] string comentario)
        {
            var servidor = User.FindFirst("Servidor")?.Value;
            var idEjecutivo = int.Parse(User.FindFirst("idEjecutivo")?.Value ?? "0");

            if (string.IsNullOrWhiteSpace(servidor))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                var resultado = await _gestionesDao.EditarGestion(servidor, idCartera, idCuenta, fecha, hora, comentario, idEjecutivo);
                return Ok(new { registrosAfectados = resultado });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al editar la gestión", error = ex.Message });
            }
        }

        #endregion

        #region Intentos Vicidial
        //carga intentos vicidial
        #endregion
    }
}
