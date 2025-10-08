using Loki.DTOs.ScriptsDTOs;
using Loki.Mark.Administracion.Gespa.Scripts.Interfaces;
using Microsoft.AspNetCore.Mvc;
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

		[HttpPut("{servidor}")]
		public async Task<IActionResult> UpdateScript(
		[FromRoute] string servidor,
		[FromBody] ScriptsDTO scriptDto)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				int rowsAffected = await _scriptsDao.UpdateScript(servidor, scriptDto);

				if (rowsAffected > 0)
				{
					return Ok(new { message = $"Script con IdScript {scriptDto.IdScript} actualizado exitosamente.", rowsAffected = rowsAffected });
				}
				else
				{
					return NotFound(new { message = $"No se encontró ningún script con IdScript {scriptDto.IdScript} para actualizar." });
				}
			}
			catch (ArgumentException ex)
			{
				return BadRequest(new { message = ex.Message });
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error al actualizar script: {ex.Message}");
				return StatusCode(500, new { message = "Ocurrió un error interno al actualizar el script.", error = ex.Message });
			}
		}

		[HttpPost("{servidor}")] 
		public async Task<IActionResult> CreateScript(
			[FromRoute] string servidor,
			[FromBody] ScriptsDTO request,
			[FromHeader] int idProducto,
			[FromHeader] int idEjecutivo
			)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				int newScriptId = await _scriptsDao.InsertScript(servidor, request, idProducto, idEjecutivo);

				return StatusCode(201, new { message = $"Script creado exitosamente con IdScript {newScriptId}.", idScript = newScriptId });
			}
			catch (ArgumentException ex)
			{
				return BadRequest(new { message = ex.Message });
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error al crear script: {ex.Message}"); 
				return StatusCode(500, new { message = "Ocurrió un error interno al crear el script.", error = ex.Message });
			}
		}

	}
}
