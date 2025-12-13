using Loki.DTOs.Procesos.Accionamientos.InformeDTOs;
using Loki.Mark.Procesos.Accionamientos.Informe.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Accionamientos.Informe.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/procesos/accionamientos/[controller]")] // Ruta anidada
    [SwaggerTag("Procesos - Accionamientos")] // Tag descriptivo
    public class InformeController : ControllerBase
    {
        private readonly IInformeService _service;

        public InformeController(IInformeService service)
        {
            _service = service;
        }

        [HttpPost("consultar")]
        [SwaggerOperation(
            Summary = "Generar Informe de Accionamientos - Yoshi",
            Description = "Genera un informe detallado o agrupado de los accionamientos (SMS, Cartas, etc.) y correos enviados, aplicando filtros dinámicos de cuentas."
        )]
        [ProducesResponseType(typeof(IEnumerable<dynamic>), 200)]
        [ProducesResponseType(typeof(object), 404)]
        public async Task<IActionResult> ConsultarInforme([FromBody] InformeRequestDto request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });
            }

            var resultados = await _service.ConsultarInformeAsync(servidorClaim, request);

            if (resultados == null || !resultados.Any())
            {
                return NotFound(new { message = "No se encontraron accionamientos para los criterios especificados." });
            }

            return Ok(resultados);
        }
    }
}