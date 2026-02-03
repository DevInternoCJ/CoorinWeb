using Loki.DTOs.GespaDTOs;
using Loki.Mark.Procesos.Gespa.Arrepentimientos.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Gespa.Arrepentimientos.Controllers
{
    [Route("api/[controller]")]
    [Tags("Procesos - ArrepentimientosGespa")]
    [ApiController]
    [SwaggerTag("Controladores de la pestaña Gespa/Arrepentimientos.")]
    public class ArrepentimientosGespaController : ControllerBase
    {
        private readonly IArrepentimientosGespaDAOs _arrepentimientosGespaInterfaces;

        public ArrepentimientosGespaController(IArrepentimientosGespaDAOs arrepentimientosGespaInterfaces)
        {
            _arrepentimientosGespaInterfaces = arrepentimientosGespaInterfaces;
        }

        [HttpPost("Buscar")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "Arrepentimientos Gespa Búsqueda - Padrino",
            Description = "Hace una búsqueda de la cuenta segun el criterio seleccionado."
        )]
        public async Task<IActionResult> ValidateArrepentimientoBusqueda([FromBody]DefinicionBusqueda request)
        {
            //// Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            //if (string.IsNullOrWhiteSpace(request.Servidor))
            //{
            //    return BadRequest(new { error = "Servidor es obligatorio." });
            //}

            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }
            var resultadoArrepentimientoBusqueda = await _arrepentimientosGespaInterfaces.ValidateArrepentimientoBusqueda(request, servidorClaim);

            if (resultadoArrepentimientoBusqueda != null)
            {
                return Ok(resultadoArrepentimientoBusqueda);
            }
            else
            {
                return BadRequest(new { error = "No se encontró información de la cuenta con los parámetros proporcionados." });
            }

        }

        [HttpPost("Arrepentimiento")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "Arrepentimientos Gespa - Padrino",
            Description = "Realiza el arrepentimiento de la cuenta segun el criterio seleccionado."
        )]
        public async Task<IActionResult> ValidateArrepentimiento([FromBody] Arrepentimiento request)
        {
            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            //if (string.IsNullOrWhiteSpace(request.Servidor))
            //{
            //    return BadRequest(new { error = "Servidor es obligatorio." });
            //}
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            var resultadoArrepentimiento = await _arrepentimientosGespaInterfaces.ValidateArrepentimiento(request, servidorClaim);

            if(resultadoArrepentimiento == null)
            {
                return Ok("Actualizacion de manera correcta.");
            }
            else
            {
                return BadRequest(new { error = "No se pudo procesar el arrepentimiento con los parámetros proporcionados." });
            }

        }


    }
}
