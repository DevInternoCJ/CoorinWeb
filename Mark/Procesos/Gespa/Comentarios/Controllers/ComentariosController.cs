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
            //if (string.IsNullOrWhiteSpace(request.Servidor))
            //{
            //    return BadRequest(new { error = "Servidor es obligatorio." });
            //}
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }


            if (string.IsNullOrWhiteSpace(request.Comentario))
            {
                return BadRequest(new { error = "Un comentario es obligatorio." });
            }

            var resultComentarios = await _comentariosGespaInterfaces.ValidateComentario(request, servidorClaim);
            if (resultComentarios == 1)
            {
                return Ok(new { Mensaje = "Actualizacion realizada con éxito." });
            }

            return BadRequest(new { Mensaje = "La cuenta no existe." });
        }
        [HttpPost("insertar-expediente")]

        [HttpPost("modificar")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "Insertar por Expediente - Irene",
            Description = "Inserta comentario por expediente."
        )]
        public async Task<IActionResult> InsertarExpediente([FromBody] ComentariosGespacs request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            // Extraemos la cartera asignada al ejecutivo desde el token/claim
            int idCarteraEjecutivo = int.Parse(User.FindFirst("idCartera")?.Value ?? "0");

            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el servidor en el token." });

            if (string.IsNullOrWhiteSpace(request.Comentario))
                return BadRequest(new { error = "El comentario es obligatorio." });

            // Ejecutar lógica del DAO
            var resultado = await _comentariosGespaInterfaces.InsertarPorExpediente(request, servidorClaim, idCarteraEjecutivo);

            if (resultado.Success)
            {
                return Ok(new { Mensaje = resultado.Mensaje });
            }

            return BadRequest(new { Mensaje = resultado.Mensaje });
        }
    }
}
