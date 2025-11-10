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
        [HttpPost("carga-llamadas")]
        [Authorize]
        [RequestSizeLimit(100_000_000)] // 100MB
        [SwaggerOperation(
             Summary = "cargar llamadas - irene",
             Description = "Carga un archivo CSV o Excel con registros de llamadas"
         )]
        public async Task<IActionResult> CargaLlamadas(
        [FromForm] CargaLlamadasRequest request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                var (success, message, errores) = await _gestionesDao.CargarLlamadasAsync(request, servidorClaim);

                if (success)
                {
                    var response = new
                    {
                        message,
                        registrosConError = errores?.Rows.Count ?? 0,
                        // Convertir DataTable a lista de objetos para evitar ciclos
                        detallesErrores = errores != null ? _gestionesDao.ConvertDataTableToList(errores) : null
                    };
                    return Ok(response);
                }
                else
                {
                    // Para errores, solo enviar mensaje y contar, no el DataTable completo
                    return BadRequest(new
                    {
                        error = message,
                        registrosConError = errores?.Rows.Count ?? 0
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al cargar las llamadas", error = ex.Message });
            }
        }
        [HttpGet("realiza-busqueda")]
        [Authorize]
        [SwaggerOperation(
            Summary = "realiza busqueda - irene",
            Description = "obtiene las gestiones"
        )]
        public async Task<IActionResult> realizabusqueda([FromQuery] int idCartera, DateTime fechaInicial, DateTime fechaFinal) 
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                var gestiones = await _gestionesService.buscaGestiones(servidorClaim, idCartera, fechaInicial, fechaFinal);
                return Ok(gestiones);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener las gestiones", error = ex.Message });
            }
        }
    }
}
