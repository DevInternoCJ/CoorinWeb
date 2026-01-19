using Loki.DTOs.Procesos.Visitas;
using Loki.Mark.Procesos.Visitas.Consulta.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Visitas.Consulta.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/procesos/visitas/consulta")]
    [SwaggerTag("Procesos - Consulta de Visitas")]
    public class ConsultaVisitasController : ControllerBase
    {
        private readonly IConsultaVisitasService _service;

        public ConsultaVisitasController(IConsultaVisitasService service)
        {
            _service = service;
        }

        [HttpPost]
        [SwaggerOperation(
            Summary = "Consultar Reporte de Visitas - Yoshi",
            Description = "Ejecuta una consulta dinámica para obtener el listado de visitas domiciliarias. Devuelve un conjunto de datos variable dependiendo de la 'Consulta' seleccionada."
        )]
        [ProducesResponseType(typeof(IEnumerable<dynamic>), 200)]
        public async Task<IActionResult> Consultar([FromBody] ConsultaVisitasRequestDto request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim)) return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });

            var resultados = await _service.ConsultarVisitasAsync(servidorClaim, request);
            return Ok(resultados);
        }
    }
}