using Loki.DTOs.FrasesDTOs;
using Loki.Mark.Administracion.Gespa.Frases.DAOs;
using Loki.Mark.Administracion.Gespa.Frases.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Administracion.Gespa.Frases.Controllers
{
	[ApiController] // Indica que esta clase es un controlador de API sin vistas
	[Route("api/[controller]")] // Define la ruta base para este controlador, por ejemplo: /api/Frases
	public class FrasesController : ControllerBase
	{
		private readonly IFrases _frasesDao;

		// Constructor para inyección de dependencias
		public FrasesController(IFrases frasesDao)
		{
			_frasesDao = frasesDao;
		}

        /// <summary>
        /// Guarda una nueva frase motivacional en la base de datos.
        /// </summary>
        /// <param name="pFrases">Objeto DTO con los datos de la frase a guardar.</param>
        /// <param name="servidor">Nombre del servidor de base de datos a conectar.</param>
        /// <returns>Un resultado HTTP que indica el éxito o fracaso de la operación.</returns>
        [HttpPost("guardar")]
        [Authorize] // asegúrate de que el token tenga el claim 'Servidor'
        public async Task<IActionResult> GuardarFrase([FromBody] FrasesDTO pFrases)
        {
            // 1️⃣ Obtiene el servidor desde el token
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            // 2️⃣ Validaciones automáticas
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // 3️⃣ Validaciones adicionales
            if (string.IsNullOrWhiteSpace(pFrases.TextoFrase))
                return BadRequest(new { Message = "El campo 'TextoFrase' no puede estar vacío." });

            try
            {
                bool success = await _frasesDao.GuardaFrasesAsync(pFrases, servidorClaim);

                if (success)
                    return Ok(new { Message = "Frase motivacional guardada exitosamente." });
                else
                    return BadRequest(new { Message = "No se pudo guardar la frase motivacional. Verifica los datos." });
            }
            catch (ArgumentException argEx)
            {
                return BadRequest(new { Message = argEx.Message });
            }
            catch (SqlException sqlEx)
            {
                Console.WriteLine($"Error de SQL en el controlador: {sqlEx.Message}");
                return StatusCode(500, new
                {
                    Message = "Ocurrió un error en la base de datos al guardar la frase.",
                    Details = sqlEx.Message
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inesperado en el controlador: {ex.Message}");
                return StatusCode(500, new
                {
                    Message = "Ocurrió un error interno al procesar la solicitud.",
                    Details = ex.Message
                });
            }
        }

    }
}

