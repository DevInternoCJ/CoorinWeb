// Ubicación: /Mark/Procesos/Accionamientos/Controllers/CargaAccionamientosController.cs
using Loki.DTOs.Procesos.Accionamientos.CargaDTOs;
using Loki.Mark.Procesos.Accionamientos.Carga.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;

namespace Loki.Mark.Procesos.Accionamientos.Carga.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/procesos/accionamientos/carga")]
    [SwaggerTag("Procesos - Accionamientos")]
    public class CargaAccionamientosController : ControllerBase
    {
        private readonly ICargaAccionamientosService _service;

        public CargaAccionamientosController(ICargaAccionamientosService service)
        {
            _service = service;
        }

        [HttpPost]
        [SwaggerOperation(
            Summary = "Cargar Archivo de Accionamientos",
            Description = "Sube y procesa un archivo Excel con accionamientos masivos. Retorna el resultado del procesamiento y la lista de errores si los hubo."
        )]
        [Consumes("multipart/form-data")] // Importante para subida de archivos
        [ProducesResponseType(typeof(CargaAccionamientosResponseDto), 200)]
        [ProducesResponseType(typeof(object), 400)]
        public async Task<IActionResult> CargarArchivo([FromForm] CargaAccionamientosRequestDto request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });

            if (request.ArchivoExcel == null || request.ArchivoExcel.Length == 0)
                return BadRequest(new { error = "No se proporcionó ningún archivo." });

            try
            {
                var resultado = await _service.ProcesarCargaAsync(servidorClaim, request, User);
                return Ok(resultado);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            // Otras excepciones serán manejadas por el GlobalErrorHandler
        }
    }
}