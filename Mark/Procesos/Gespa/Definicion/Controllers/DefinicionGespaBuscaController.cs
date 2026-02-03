using Loki.DTOs.GespaDTOs;
using Loki.Mark.Procesos.Gespa.Definicion.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Gespa.Definicion.Controllers
{

    [Route("api/[controller]")]
    [Tags("Procesos - DefinicionGespaBusca")]
    [ApiController]
    [SwaggerTag("Controladores de la pestaña Gespa/Definicion.")]
    public class DefinicionGespaBuscaController : ControllerBase
    {
        private readonly IDefinicionGespaBuscaDAOs _definicionGespaInterfaces;

        public DefinicionGespaBuscaController(IDefinicionGespaBuscaDAOs definicionGespaInterfaces)
        {
            _definicionGespaInterfaces = definicionGespaInterfaces;
        }

        [HttpPost("Buscar")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "DefinicionBusqueda - Padrino",
            Description = "Hace una busqueda de la cuenta."
        )]
        public async Task<IActionResult> DefinicionGespaBusca([FromBody] DefinicionBusqueda request)
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
            var resultadoDefinicionBusqueda = await _definicionGespaInterfaces.ValidateDefinicionBusqueda(request, servidorClaim);
            
            // El método QueryFirstOrDefaultAsync<T> de Dapper devuelve 'null' si no encuentra filas.
            if (resultadoDefinicionBusqueda == null)
            {
                // Si es NULL, la cuenta NO se encontró. Devolvemos 400 Bad Request.
                return BadRequest(new { error = "No se encontró información de la cuenta con los parámetros proporcionados." });
            }
            else
            {
                // Si NO es NULL, se encontró el objeto de la cuenta. Devolvemos 200 OK y el objeto.
                return Ok(resultadoDefinicionBusqueda);
            }

        }


        [HttpPost("Define")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "DefinicionGespa - Padrino",
            Description = "Define la cuenta la cuenta."
        )]
        public async Task<IActionResult> DefinicionGespa([FromBody] Define request)
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
            var resultadoDefinicion = await _definicionGespaInterfaces.ValidateDefinicion(request, servidorClaim);

            if (string.IsNullOrEmpty(resultadoDefinicion))
            {
                // ESCENARIO 2: No hay mensaje o la cadena está vacía (Validación Exitosa)
                // Esto significa que el proceso de la base de datos no devolvió ninguna condición especial.             

                return Ok(new { mensaje = "Cuenta definida." });
            }
            else
            {
                // ESCENARIO 1: La variable contiene un mensaje (Mensaje de la Base de Datos)
                // Esto significa que la base de datos reportó una condición o un error específico.

                // Devolvemos 400 Bad Request junto con el mensaje que regresó la base de datos.
                return BadRequest(new { error = resultadoDefinicion });
            }

        }

    }
}
