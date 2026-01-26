using Loki.DTOs.Procesos.Visitas;
using Loki.Mark.Procesos.Visitas.Eliminar.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Visitas.Eliminar.Controllers
{
    /// <summary>
    /// Controlador para la eliminación masiva de visitas mediante carga de archivo.
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/procesos/visitas/eliminar")]
    [SwaggerTag("Procesos - Eliminar Visitas")]
    public class EliminarVisitasController : ControllerBase
    {
        private readonly IEliminarVisitasService _service;

        public EliminarVisitasController(IEliminarVisitasService service)
        {
            _service = service;
        }

        /// <summary>
        /// Elimina masivamente visitas registradas basándose en un archivo Excel.
        /// </summary>
        /// <remarks>
        /// Requiere un archivo Excel con las columnas: "Cuenta", "FechaVisita", "HoraVisita".
        /// El proceso identifica los registros exactos por esa llave compuesta y los elimina de la base de datos.
        /// </remarks>
        /// <param name="request">Archivo y ID de Cartera.</param>
        /// <returns>Resultado de la operación.</returns>
        [HttpPost]
        [SwaggerOperation(
            Summary = "Eliminar Visitas Masivamente (Carga Excel)",
            Description = @"

            Este endpoint recibe un archivo Excel y elimina las visitas que coincidan exactamente con los registros proporcionados.

            **Requisitos obligatorios del archivo Excel:**
            El archivo debe contener **exactamente** las siguientes columnas (nombres sensibles a mayúsculas/minúsculas):
            1. **`Cuenta`**: Número de cuenta o expediente.
            2. **`FechaVisita`**: Fecha de la visita (formato fecha).
            3. **`HoraVisita`**: Hora de la visita (formato hora).

            El sistema utiliza la combinación de estos tres datos como llave compuesta para identificar y borrar el registro único."
        )]
        [Consumes("multipart/form-data")]
        [ProducesResponseType(typeof(EliminarVisitasResponseDto), 200)]
        [ProducesResponseType(typeof(object), 400)]
        [ProducesResponseType(typeof(object), 500)]
        public async Task<IActionResult> Eliminar([FromForm] EliminarVisitasRequestDto request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim)) return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });

            if (request.ArchivoExcel == null || request.ArchivoExcel.Length == 0)
                return BadRequest(new { error = "Archivo no proporcionado." });

            try
            {
                var resultado = await _service.ProcesarEliminacionAsync(servidorClaim, request, User);
                return Ok(resultado);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error interno al eliminar visitas: " + ex.Message });
            }
        }
    }
}