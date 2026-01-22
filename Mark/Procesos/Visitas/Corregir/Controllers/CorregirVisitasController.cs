using Loki.DTOs.Procesos.Visitas;
using Loki.Mark.Procesos.Visitas.Corregir.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Visitas.Corregir.Controllers
{
    /// <summary>
    /// Controlador encargado de la corrección y edición de visitas domiciliarias ya registradas.
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/procesos/visitas/corregir")]
    [SwaggerTag("Procesos - Corregir Visitas")]
    public class CorregirVisitasController : ControllerBase
    {
        private readonly ICorregirVisitasService _service;

        public CorregirVisitasController(ICorregirVisitasService service)
        {
            _service = service;
        }

        /// <summary>
        /// Busca el historial de visitas de una cuenta específica para su edición.
        /// </summary>
        /// <remarks>
        /// Devuelve una lista de las gestiones domiciliarias asociadas a la cuenta.
        /// Esta lista incluye las llaves primarias (Fecha y Hora original) necesarias para solicitar una edición.
        /// </remarks>
        /// <param name="idCartera">Identificador de la cartera.</param>
        /// <param name="idCuenta">Número de cuenta o expediente.</param>
        /// <returns>Colección de visitas editables con sus detalles actuales.</returns>
        [HttpGet("buscar")]
        [SwaggerOperation(
            Summary = "Buscar Visitas por Cuenta",
            Description = "Obtiene el listado de visitas registradas para una cuenta, permitiendo seleccionar cuál se desea corregir."
        )]
        [ProducesResponseType(typeof(IEnumerable<VisitaEditableDto>), 200)]
        [ProducesResponseType(typeof(object), 401)]
        public async Task<IActionResult> Buscar([FromQuery] int idCartera, [FromQuery] string idCuenta)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });

            var request = new BuscarVisitasRequestDto { IdCartera = idCartera, IdCuenta = idCuenta };
            var resultados = await _service.BuscarVisitasAsync(servidorClaim, request);

            return Ok(resultados);
        }

        /// <summary>
        /// Modifica un dato específico de una visita y registra la auditoría.
        /// </summary>
        /// <remarks>
        /// Permite corregir campos sensibles (Fecha, Ejecutivo, Sucursal o Comentario).
        /// Internamente realiza una transacción que actualiza el registro y guarda el valor anterior en el log de auditoría (LogArrepentimientos).
        /// </remarks>
        /// <param name="request">DTO con las llaves de la visita (Fecha/Hora) y el nuevo valor a asignar.</param>
        /// <returns>Mensaje de éxito o error.</returns>
        [HttpPut("editar")]
        [SwaggerOperation(
            Summary = "Editar Campo de Visita",
            Description = "Actualiza un campo específico de una gestión domiciliaria y genera un registro histórico del cambio por seguridad."
        )]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(typeof(object), 400)]
        [ProducesResponseType(typeof(object), 404)]
        [ProducesResponseType(typeof(object), 500)]
        public async Task<IActionResult> Editar([FromBody] EditarVisitaRequestDto request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });

            try
            {
                bool exito = await _service.EditarVisitaAsync(servidorClaim, request, User);

                if (exito)
                    return Ok(new { message = "Visita actualizada correctamente." });
                else
                    return NotFound(new { error = "No se encontró la visita especificada o no se pudo actualizar." });
            }
            catch (ArgumentException ex)
            {
                // Errores de validación de negocio (ej. Fecha inválida, Ejecutivo no existe)
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                // Errores inesperados de base de datos
                return StatusCode(500, new { error = "Error interno al procesar la edición: " + ex.Message });
            }
        }
    }
}