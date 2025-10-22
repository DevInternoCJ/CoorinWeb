using Loki.DTOs.PlantillasCorreoDTOs;
using Loki.DTOs.ScriptsDTOs;
using Loki.Mark.Administracion.Gespa.Scripts.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Xml.Linq;

namespace Loki.Mark.Administracion.Gespa.Scripts.Controllers
{



	[ApiController]
	[Route("api/[controller]")]
	public class ScriptsController : ControllerBase
	{
		private readonly IScriptsDAO _scriptsDao; 

		public ScriptsController(IScriptsDAO scripts)
		{
			_scriptsDao = scripts;
		}

        [HttpPut("actualizar")]
        [Authorize]
        [SwaggerOperation(
          Summary = "actualizar script",
          Description = "actualiza un script existente"
          )]
        public async Task<IActionResult> UpdateScript([FromBody] actualizarScriptDTO actualizarScript)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                int rowsAffected = await _scriptsDao.UpdateScript(servidorClaim, actualizarScript);

                if (rowsAffected > 0)
                {
                    return Ok(new
                    {
                        message = $"Script con IdScript {actualizarScript.IdScript} actualizado exitosamente.",
                        rowsAffected
                    });
                }
                else
                {
                    return NotFound(new
                    {
                        message = $"No se encontró ningún script con IdScript {actualizarScript.IdScript} para actualizar."
                    });
                }
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al actualizar script: {ex.Message}");
                return StatusCode(500, new
                {
                    message = "Ocurrió un error interno al actualizar el script.",
                    error = ex.Message
                });
            }
        }

        [HttpPost("guardar")]
        [Authorize]
        [SwaggerOperation(
          Summary = "guardar scripts",
          Description = "guarda un nuevo scripts"
          )]
        public async Task<IActionResult> CreateScript([FromBody] guardarScriptsDTO request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                int newScriptId = await _scriptsDao.InsertScript(
                    servidorClaim,
                    request,
                    request.IdProducto,
                    request.IdEjecutivoInsert
                );

                return StatusCode(201, new
                {
                    message = $"Script creado exitosamente con IdScript {newScriptId}.",
                    idScript = newScriptId
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al crear script: {ex.Message}");
                return StatusCode(500, new
                {
                    message = "Ocurrió un error interno al crear el script.",
                    error = ex.Message
                });
            }
        }


        [HttpDelete("eliminar")]
        [Authorize]
        [SwaggerOperation(
          Summary = "eliminar scripts - irene",
          Description = "elimina un script existente"
          )]
        public async Task<IActionResult> DeletePlantilla([FromBody] eliminarScriptDTO request)
        {
            if (request == null || request.IdScript <= 0)
            {
                return BadRequest("El ID del script no es válido.");
            }
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            string nombreBaseDatos = "Collection";

            bool exito = await _scriptsDao.DeleteScript(request.IdScript, servidorClaim, nombreBaseDatos);

            if (exito)
            {
                return Ok(new { mensaje = "Script eliminada correctamente." });
            }
            else
            {
                return StatusCode(500, new { mensaje = "Error eliminando el script. Intente de nuevo." });
            }
        }
    }
}
