using Loki.DTOs.DiaDelEjecutivoDTOs;
using Loki.Mark.Reportes.DiaDelEjecutivo.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Reportes.DiaDelEjecutivo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [SwaggerTag("Controladores de DiaDelEjecutivo")]
    public class DiaDelEjecutivoController : ControllerBase
    {
        private readonly IDiaDelEjecutivoDAOs _diaDelEjecutivoInterfaces;

        public DiaDelEjecutivoController(IDiaDelEjecutivoDAOs diaDelEjecutivoInterfaces)
        {
            _diaDelEjecutivoInterfaces = diaDelEjecutivoInterfaces;
        }

        [HttpPost("DiaDelEjecutivo")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "DiaDelEjecutivo - Padrino",
            Description = "Muestra los tiempos del ejecutivo durante un día."
        )]
        public async Task<dynamic?> ValidateDiaDelEjecutivo([FromBody] DiaDelEjecutivoDTOs request)
        {
            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            if (string.IsNullOrWhiteSpace(request.servidor))
            {
                return BadRequest(new { error = "Servidor es obligatorio." });
            }
            var resultadoDiaDelEjecutivo = await _diaDelEjecutivoInterfaces.ValidateDiaDelEjecutivo(request);

            if(resultadoDiaDelEjecutivo != null)
            {
                return Ok(resultadoDiaDelEjecutivo);
            }
            else
            {
                return BadRequest(new { error = "No se encontró información con los parámetros proporcionados." });
            }

        }

    }
}
