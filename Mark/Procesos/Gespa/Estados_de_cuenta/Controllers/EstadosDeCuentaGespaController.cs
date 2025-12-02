using Loki.DTOs.GespaDTOs;
using Loki.Mark.Procesos.Gespa.Estados_de_cuenta.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Gespa.Estados_de_cuenta.Controllers
{
    [Route("api/[controller]")]
    [Tags("Procesos - EstadosDeCuentaGespa")]
    [ApiController]
    [SwaggerTag("Controladores de la pestaña Gespa/EstadosDeCuenta.")]
    public class EstadosDeCuentaGespaController : ControllerBase
    {
        private readonly IEstadosDeCuentaGespaDAOs _estadosDeCuentaGespaInterfaces;

        public EstadosDeCuentaGespaController(IEstadosDeCuentaGespaDAOs estadosDeCuentaGespaInterfaces)
        {
            _estadosDeCuentaGespaInterfaces = estadosDeCuentaGespaInterfaces;
        }

        [HttpPost("EstadosDeCuenta")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "EstadosDeCuenta - Padrino",
            Description = "Muestra información de las cuentas."
        )]
        public async Task<dynamic?> ValidateEstadosDeCuenta([FromBody]EstadosDeCuenta request)
        {
            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            if (string.IsNullOrWhiteSpace(request.servidor))
            {
                return BadRequest(new { error = "Servidor es obligatorio." });
            }
            var resultadoEstadosDeCuenta = await _estadosDeCuentaGespaInterfaces.ValidateEstadosDeCuenta(request);

            if (resultadoEstadosDeCuenta != null)
            {
                return Ok(resultadoEstadosDeCuenta);
            }
            else
            {
                return BadRequest(new { error = "No se encontró información con los parámetros proporcionados." });
            }
        }

        [HttpPost("EstadosDeCuenta/Modificar")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "EstadosDeCuenta/Modificar - Padrino",
            Description = "Realiza una actualizacion a la tabla SolicitudesEstadosDeCuenta"
        )]
        public async Task<dynamic?> ValidateEstadosDeCuentaModifica(EstadosDeCuentaGespaModificar request)
        {
            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            if (string.IsNullOrWhiteSpace(request.servidor))
            {
                return BadRequest(new { error = "Servidor es obligatorio." });
            }
            var resultadoEstadosDeCuentaModifica = await _estadosDeCuentaGespaInterfaces.ValidateEstadosDeCuentaModifica(request);

            if (resultadoEstadosDeCuentaModifica != null)
            {
                return Ok(new { mensaje = "Se actualizo la informacion de manera correcta."});
            }
            else
            {
                return BadRequest(new { error = "No se encontró información con los parámetros proporcionados." });
            }
        }

    }
}
