using Loki.DTOs.Procesos.Accionamientos.CarteoDTOs;
using Loki.Mark.Procesos.Accionamientos.Carteo.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Accionamientos.Carteo.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/procesos/carteo")]
    [SwaggerTag("Procesos - Carteo Devuelto")]
    public class CarteoController : ControllerBase
    {
        private readonly ICarteoService _service;

        public CarteoController(ICarteoService service)
        {
            _service = service;
        }

        [HttpGet("buscar-cuenta")]
        [SwaggerOperation(
            Summary = "Buscar Cuenta para Carteo",
            Description = "Busca una cuenta y sus domicilios registrados para asignar un carteo devuelto.")]
        [ProducesResponseType(typeof(CuentaCarteoResponseDto), 200)]
        [ProducesResponseType(typeof(object), 404)] // Not Found
        public async Task<IActionResult> BuscarCuenta([FromQuery] int idCartera, [FromQuery] string cuentaOrExpediente, [FromQuery] bool esExpediente = false)
        {
            string? servidor = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidor)) return Unauthorized();

            var result = await _service.BuscarCuentaAsync(servidor, idCartera, cuentaOrExpediente, esExpediente);

            if (result == null) return NotFound(new { message = "Cuenta no encontrada." });

            return Ok(result);
        }

        [HttpPost("guardar-manual")]
        [SwaggerOperation(
            Summary = "Guardar Carteo Manual",
            Description = "Registra un carteo devuelto capturado manualmente.")]
        public async Task<IActionResult> GuardarManual([FromBody] GuardarCarteoManualRequestDto request)
        {
            string? servidor = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidor)) return Unauthorized();

            try
            {
                bool exito = await _service.GuardarCarteoManualAsync(servidor, request, User);
                if (exito) return Ok(new { message = "Guardado correctamente." });
                return BadRequest(new { error = "No se pudo guardar el registro." });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("carga-masiva")]
        [SwaggerOperation(
            Summary = "Carga Masiva de Carteo",
            Description = "Sube un archivo Excel para procesar devoluciones de carteo masivamente.")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CargaMasiva([FromForm] CargaCarteoRequestDto request)
        {
            string? servidor = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidor)) return Unauthorized();

            if (request.ArchivoExcel == null) return BadRequest("Archivo requerido.");

            try
            {
                var result = await _service.ProcesarCargaMasivaAsync(servidor, request, User);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
