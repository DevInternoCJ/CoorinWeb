using Loki.DTOs.AuditoriaDTOs;
using Loki.Mark.Administracion.Gespa.CamposPantalla.Services;
using Loki.Mark.Auditoria.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Auditoria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditoriaController : ControllerBase
    {
        private readonly AuditoriaService _auditoriaService;
        public AuditoriaController(AuditoriaService service)
        {
            _auditoriaService = service;
        }


        [HttpPost("consulta-auditoria")]
        [SwaggerOperation(
            Summary = "Consulta Auditoría",
            Description = "Obtiene los registros de auditoría dentro del rango de fechas mediante paginación."
        )]
        public async Task<IActionResult> ObtenerAuditoriaDetalle([FromBody] AuditoriaFilterDto parametros)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }
            var (datos, total) = await _auditoriaService.ObtenerAuditoriaDetalleAsync(parametros, servidorClaim);

            return Ok(new
            {
                TotalRegistros = total,
                Registros = datos
            });
        }

    }
}
