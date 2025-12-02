using CoorinWeb.Loki.Global;
using Loki.DTOs.GestionesDTOs;
using Loki.DTOs.MetasDTOs;
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
    [Tags("Procesos - Gestiones")]
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

        [HttpPost("carga-llamadas")]
        [Authorize]
        [SwaggerOperation(
            Summary = "carga de llamadas - Irene",
            Description = "Recibe archivo Excel/CSV de llamadas, crea tabla temporal y ejecuta SP de inserción."
        )]
        public async Task<IActionResult> CargarLlamadas([FromForm] CargarLlamadas2Request request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { success = false, message = "No se encontró el claim 'Servidor' en el token." });

            if (request.Archivo == null || request.Archivo.Length == 0)
                return BadRequest(new { success = false, message = "Debe enviar un archivo válido." });

            // 1. Leer archivo → DataTable
            var dt = _gestionesDao.LeerArchivo(request.Archivo);
            if (dt.Rows.Count == 0)
                return BadRequest(new { success = false, message = "El archivo está vacío." });

            // 2. Llamar al DAO
            var result = await _gestionesDao.CargarLlamadasAsync(
                dt,
                request.IdCartera,
                request.IdEjecutivo,
                servidorClaim
            );

            return Ok(result);
        }

        #endregion

        #region Consulta gestiones tel
        [HttpGet("consulta-llamadas")]
        [Authorize]
        [SwaggerOperation(
          Summary = "consulta llamadas - Irene",
          Description = "Obtiene las gestiones por cartera y rango de fechas"
      )]

        public async Task<IActionResult> RealizaBusqueda([FromQuery] int idCartera,[FromQuery] DateTime fechaInicial,[FromQuery] DateTime fechaFinal,[FromQuery] int jerarquia, [FromQuery] int? idProducto = null)
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


        [HttpPost("cargar-intentos-vicidial")]
        [Authorize]
        [SwaggerOperation(
         Summary = "carga intentos vicidial - Irene",
         Description = "Procesa archivo Vicidial, limpia gestiones con contacto, las inserta en tabla temporal y ejecuta validaciones SP."
     )]
        
        public async Task<IActionResult> CargarVicidial([FromForm] CargarIntentosRequest request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            if (request.Archivo == null || request.Archivo.Length == 0)
                return BadRequest("Debe subir un archivo válido.");

            DataTable dtVici;

            string ext = Path.GetExtension(request.Archivo.FileName).ToLower();

            if (ext == ".csv")
            {
                dtVici = _gestionesDao.LeerIntentosCsv(request.Archivo);
            }
            else if (ext == ".xlsx")
            {
                dtVici = _gestionesDao.LeerIntentosExcel(request.Archivo);
            }
            else
            {
                return BadRequest("Formato no aceptado. Solo CSV o XLSX.");
            }

            // 2. Limpiar status
            var dtLimpio = _gestionesDao.LimpiarGestiones(dtVici);

            // 3. Insertar
            var result = await _gestionesDao.CargarIntentos(
                dtLimpio,
                request.IdCartera,
                request.IdEjecutivo,
                servidorClaim
            );

            return Ok(result);
        }


        #endregion
    }
}
