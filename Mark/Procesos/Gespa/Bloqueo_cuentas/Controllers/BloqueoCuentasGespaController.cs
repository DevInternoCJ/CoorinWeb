using Loki.DTOs.GespaDTOs;
using Loki.Mark.Procesos.Gespa.Bloqueo_cuentas.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Gespa.Bloqueo_cuentas.Controllers
{
    [Route("api/[controller]")]
    [Tags("Procesos - BloqueoCuentasGespa")]
    [ApiController]
    [SwaggerTag("Controladores de la pestaña Gespa/Bloqueo_Cuentas.")]
    public class BloqueoCuentasGespaController : ControllerBase
    {
        private readonly IBloqueoCuentasGespaDAOs _bloqueoCuentasGespaInterfaces;
        public BloqueoCuentasGespaController(IBloqueoCuentasGespaDAOs bloqueoCuentasGespaInterfaces)
        {
            _bloqueoCuentasGespaInterfaces = bloqueoCuentasGespaInterfaces;
        }

        [HttpPost("Buscar")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "Bloqueo Cuentas Gespa Búsqueda - Padrino",
            Description = "Hace una búsqueda de la cuenta."
        )]
        public async Task<IActionResult> ValidateBloqueoCuentasBusqueda([FromBody] BloqueoCuentasBusqueda request)
        {
            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            if (string.IsNullOrWhiteSpace(request.servidor))
            {
                return BadRequest(new { error = "Servidor es obligatorio." });
            }

            var resultadoBloqueoCuentasBusqueda = await _bloqueoCuentasGespaInterfaces.ValidateBloqueoCuentasBusqueda(request);
            
            if (resultadoBloqueoCuentasBusqueda != null)
            {
                return Ok(resultadoBloqueoCuentasBusqueda);
            }
            else
            {
                return BadRequest(new { error = "No se encontró información de la cuenta con los parámetros proporcionados." });
            }



        }


        [HttpPost("Bloqueo")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "BloqueoCuentasGespa - Padrino",
            Description = "realiza un bloqueo de la cuenta."
        )]
        public async Task<IActionResult> ValidateBloqueoCuentas([FromBody] BloqueoCuentasBusqueda request)
        {
            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            if (string.IsNullOrWhiteSpace(request.servidor))
            {
                return BadRequest(new { error = "Servidor es obligatorio." });
            }

            var resultadoBloqueoCuentas = await _bloqueoCuentasGespaInterfaces.ValidateBloqueoCuentas(request);

            if(resultadoBloqueoCuentas != null)
            {
                return Ok(resultadoBloqueoCuentas);
            }
            else
            {
                return BadRequest(new { error = "No se pudo realizar el bloqueo de la cuenta con los parámetros proporcionados." });
            }

        }



    }
}
