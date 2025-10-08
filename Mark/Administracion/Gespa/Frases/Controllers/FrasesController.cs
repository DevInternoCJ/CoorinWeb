using Loki.DTOs.FrasesDTOs;
using Loki.Mark.Administracion.Gespa.Frases.DAOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Administracion.Gespa.Frases.Controllers
{
	[ApiController] // Indica que esta clase es un controlador de API sin vistas
	[Route("api/[controller]")] // Define la ruta base para este controlador, por ejemplo: /api/Frases
	public class FrasesController : ControllerBase
	{
		private readonly FrasesDao _frasesDao;

		// Constructor para inyección de dependencias
		public FrasesController(FrasesDao frasesDao)
		{
			_frasesDao = frasesDao;
		}

		/// <summary>
		/// Guarda una nueva frase motivacional en la base de datos.
		/// </summary>
		/// <param name="pFrases">Objeto DTO con los datos de la frase a guardar.</param>
		/// <param name="servidor">Nombre del servidor de base de datos a conectar.</param>
		/// <returns>Un resultado HTTP que indica el éxito o fracaso de la operación.</returns>
		[HttpPost("guardar")] // Define la ruta específica para este método, por ejemplo: /api/Frases/guardar
		public async Task<IActionResult> GuardarFrase([FromBody] FrasesDTO pFrases, [FromQuery] string servidor)
		{
			// 1. Validaciones básicas del modelo (automáticas con [ApiController] y [FromBody])
			// Si el DTO no cumple las validaciones (ej. [Required]), ModelState.IsValid será false
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState); // Retorna un 400 Bad Request con los errores de validación
			}

			// 2. Validaciones de negocio adicionales (por ejemplo, si la frase está vacía)
			if (string.IsNullOrWhiteSpace(pFrases.TextoFrase))
			{
				return BadRequest(new { Message = "El campo 'TextoFrase' no puede estar vacío." });
			}

			// 3. Validación para el parámetro 'servidor'
			if (string.IsNullOrEmpty(servidor))
			{
				return BadRequest(new { Message = "El parámetro 'servidor' es requerido." });
			}


			try
			{
				// 4. Llamada al repositorio para guardar la frase
				bool success = await _frasesDao.GuardaFrasesAsync(pFrases, servidor);

				if (success)
				{
				
					return Ok(new { Message = "Frase motivacional guardada exitosamente." });
				}
				else
				{
					
					return BadRequest(new { Message = "No se pudo guardar la frase motivacional. Verifica los datos." });
				}
			}
			catch (ArgumentException argEx)
			{
				// Captura errores específicos como "Servidor inválido"
				return BadRequest(new { Message = argEx.Message });
			}
			catch (SqlException sqlEx)
			{
				// Captura excepciones relacionadas con la base de datos
				Console.WriteLine($"Error de SQL en el controlador: {sqlEx.Message}");
				return StatusCode(500, new { Message = "Ocurrió un error en la base de datos al guardar la frase.", Details = sqlEx.Message });
			}
			catch (Exception ex)
			{
				// Captura cualquier otra excepción inesperada
				Console.WriteLine($"Error inesperado en el controlador: {ex.Message}");
				return StatusCode(500, new { Message = "Ocurrió un error interno al procesar la solicitud.", Details = ex.Message });
			}
		}
	}
}
