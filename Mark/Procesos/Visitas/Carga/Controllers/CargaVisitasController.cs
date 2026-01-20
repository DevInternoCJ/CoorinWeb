using Loki.DTOs.Procesos.Visitas;
using Loki.Mark.Procesos.Visitas.Carga.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Visitas.Carga.Controllers
{
    /// <summary>
    /// Controlador para la carga masiva de resultados de visitas domiciliarias desde Excel.
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/procesos/visitas/carga")]
    [SwaggerTag("Procesos - Carga de Visitas")]
    public class CargaVisitasController : ControllerBase
    {
        private readonly ICargaVisitasService _service;

        public CargaVisitasController(ICargaVisitasService service)
        {
            _service = service;
        }

        /// <summary>
        /// Procesa un archivo Excel con registros de visitas.
        /// </summary>
        /// <remarks>
        /// Este endpoint realiza un proceso ETL completo:
        /// 1. Lee el archivo Excel.
        /// 2. Valida que contenga las columnas requeridas según la cartera (Layout).
        /// 3. Valida el formato de fechas para evitar errores de base de datos.
        /// 4. Crea dinámicamente una tabla temporal y realiza un volcado masivo (Bulk Insert).
        /// 5. Ejecuta los procedimientos almacenados de validación e inserción.
        ///
        /// Retorna el número de registros cargados y una lista de aquellos que fallaron (con su motivo).
        /// </remarks>
        /// <param name="request">DTO que contiene el archivo Excel y la configuración de la carga (Cartera, Complemento).</param>
        /// <returns>Objeto con estadísticas de la carga y lista de errores.</returns>
        [HttpPost]
        [SwaggerOperation(
            Summary = "Carga Masiva de Visitas",
            Description = "Sube y procesa un archivo Excel con resultados de visitas domiciliarias."
        )]
        [Consumes("multipart/form-data")] // Indispensable para Swagger con archivos
        [ProducesResponseType(typeof(CargaVisitasResponseDto), 200)]
        [ProducesResponseType(typeof(object), 400)]
        [ProducesResponseType(typeof(object), 500)]
        public async Task<IActionResult> CargarVisitas([FromForm] CargaVisitasRequestDto request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });
            }

            if (request.ArchivoExcel == null || request.ArchivoExcel.Length == 0)
            {
                return BadRequest(new { error = "Archivo no proporcionado." });
            }

            try
            {
                var resultado = await _service.ProcesarCargaAsync(servidorClaim, request, User);
                return Ok(resultado);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                // Loguear el error real en servidor si es necesario
                return StatusCode(500, new { error = "Error interno durante la carga: " + ex.Message });
            }
        }
    }
}