using DocumentFormat.OpenXml.Drawing.Diagrams;
using Loki.DTOs.GespaDTOs;
using Loki.Mark.Auth.Controllers;
using Loki.Mark.Procesos.Gespa.Comentarios.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Gespa.Comentarios.Controllers
{
    [Route("api/[controller]")]
    [Tags("Procesos - Comentarios")]
    [ApiController]
    [SwaggerTag("Controlador de la pestaña Gespa/Comentarios.")]

    public class ComentariosController : ControllerBase
    {
        private readonly IComentariosGespaDAOs _comentariosGespaInterfaces;

        public ComentariosController(IComentariosGespaDAOs comentariosGespaInterfaces)
        {
            _comentariosGespaInterfaces = comentariosGespaInterfaces;
        }

        [HttpPost("modificar")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "Modificar Comentario - Padrino",
            Description = "Inserta comentarios y/o cambia la situacion de la cuenta."
        )]

        public async Task<IActionResult> ComentariosGespa([FromBody] ComentariosGespacs request)
        {

            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            if (string.IsNullOrWhiteSpace(request.Servidor))
            {
                return BadRequest(new { error = "Servidor es obligatorio." });
            }
            if (string.IsNullOrWhiteSpace(request.Comentario))
            {
                return BadRequest(new { error = "Un comentario es obligatorio." });
            }

            var resultComentarios = await _comentariosGespaInterfaces.ValidateComentario(request);
            if (resultComentarios == 1)
            {
                return Ok(new { Mensaje = "Actualizacion realizada con éxito." });
            }

            return BadRequest(new { Mensaje = "La cuenta no existe." });
        }

    }
}
