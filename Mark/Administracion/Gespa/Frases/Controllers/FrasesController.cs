using Loki.DTOs.FrasesDTOs;
using Loki.Mark.Administracion.Gespa.Frases.DAOs;
using Loki.Mark.Administracion.Gespa.Frases.Interfaces;
using Loki.Mark.Administracion.Gespa.Frases.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Administracion.Gespa.Frases.Controllers
{
	[ApiController] // Indica que esta clase es un controlador de API sin vistas
	[Route("api/[controller]")] // Define la ruta base para este controlador, por ejemplo: /api/Frases
	public class FrasesController : ControllerBase
	{
		private readonly IFrases _frasesDao;
        private readonly IFrasesService _frasesService;

		// Constructor para inyección de dependencias
		public FrasesController(IFrases frasesDao, IFrasesService frasesService)
		{
			_frasesDao = frasesDao;
            _frasesService = frasesService;
        }

        /// <summary>
        /// Guarda una nueva frase motivacional en la base de datos.
        /// </summary>
        /// <param name="pFrases">Objeto DTO con los datos de la frase a guardar.</param>
        /// <param name="servidor">Nombre del servidor de base de datos a conectar.</param>
        /// <returns>Un resultado HTTP que indica el éxito o fracaso de la operación.</returns>
        [HttpPost("guardar")]
        [Authorize]
        [SwaggerOperation(
            Summary = "guardar frases",
            Description = "crea una nueva frase"
        )]
        public async Task<IActionResult> GuardarFrase([FromBody] FrasesDTO pFrases)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

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

        [HttpGet("frases")]
        [Authorize]
        [SwaggerOperation(
           Summary = "Frases - Irene",
           Description = "Obtiene un listado de las frases disponibles."
       )]
        public async Task<IActionResult> GetFrases([FromQuery] int ejecutivo)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                var frases = await _frasesService.GetFrasesMotivacion(servidorClaim, ejecutivo);
                return Ok(frases);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener las frases", error = ex.Message });
            }
        }

        [HttpPut("activar-frase")]
        [Authorize]
        [SwaggerOperation(
         Summary = "Activar Frases - Irene",
         Description = "Activa y desactiva una frase."
     )]
        public async Task<IActionResult> ActivarFrase([FromBody] ActivarFraseDTO request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                var resultado = await _frasesDao.ActivarFrase(servidorClaim, request.IdRegistro, request.Activo);

                if (resultado > 0)
                {
                    return Ok(new
                    {
                        message = "Estado de frase actualizado correctamente",
                        registrosAfectados = resultado
                    });
                }

                return NotFound(new { message = "No se encontró la frase para actualizar" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al actualizar el estado",
                    error = ex.Message
                });
            }
        }
    }
}

