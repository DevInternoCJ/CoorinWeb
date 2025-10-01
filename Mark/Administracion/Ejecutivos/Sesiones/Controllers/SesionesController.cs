using Loki.DTOs.SesionesDTOs;
using Loki.Mark.Administracion.Ejecutivos.Sesiones.Interfaces;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel;
using System.Data;

namespace Loki.Mark.Administracion.Ejecutivos.Sesiones.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class SesionesController : ControllerBase
	{
		private readonly ISesionesService _sesionesService;

		public SesionesController(ISesionesService sesionesService)
		{
			_sesionesService = sesionesService;
		}

		[HttpGet("get-sesiones-ejecutivos/{idEjecutivo}")]
		[SwaggerOperation(
			Summary = "Sesiones Ejecutivos",
			Description = "Devuelve un listado organizado por jeraraquía de los ejecutivos subordinados del idEjecutivo ingresado."
		)]
		public async Task<IActionResult> SesionesEjecutivos(int idEjecutivo)
		{
			if (idEjecutivo <= 0)
			{
				return BadRequest(new { error = "IdEjecutivo es obligatorio." });
			}

			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "No se encontró el claim 'Servidor' en el token." });
			}


			var sesiones = await _sesionesService.CargaSesionesEjecutivos(servidorClaim, idEjecutivo);

			if (sesiones == null || sesiones.Count == 0)
			{
				return NotFound(new { error = "No se encontraron sesiones." });
			}
			return Ok(sesiones);
		}


		[HttpPost("reset-password-ejecutivo")]
		[AllowAnonymous]
		[SwaggerOperation(
			Summary = "Resetear Contraseña",
			Description = "Reinicia la contraseña del usuario a 4 letras solicitado para que la cambie desde la pantalla de login."
		)]
		public async Task<IActionResult> ResetearContrasenia([FromBody] UsuarioRequest usuario)
		{
			//string? servidorClaim = User.FindFirst("Servidor")?.Value;
			string? servidorClaim = "Albaz";

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			bool ok = await _sesionesService.ResetearContraseniaAsync(usuario.Usuario, servidorClaim);
			return ok ? Ok("Contraseña reseteada.") : StatusCode(500, "Fallo al resetear la contraseña.");
		}

		[HttpPatch("logout-ejecutivo/{idEjecutivo}")]
		[AllowAnonymous]
		[SwaggerOperation(
			Summary = "Logout Ejecutivo",
			Description = "Cierra una sesión abierta en Coorin o Gespa del ejecutivo especificado."
		)]
		public async Task<IActionResult> LogoutEjecutivo(int idEjecutivo)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			if (idEjecutivo <= 0)
			{
				return BadRequest(new { error = "El IdEjecutivo es inválido." });
			}

			bool ok = await _sesionesService.CerrarSesionAsync(idEjecutivo, servidorClaim);

			return ok ? Ok(new { mensaje = "Sesión cerrada." }) : StatusCode(500, new { error = "No se cerró la sesión del ejecutivo." });
		}

		[HttpPatch("unlock-ejecutivo/{idEjecutivo}")]
		[SwaggerOperation(
			Summary = "Desbloquear Ejecutivo",
			Description = "Remeueve el estatus de bloqueo de un ejecutivo que haya excedido el número posible de intentos de inicio de sesión."
		)]
		public async Task<IActionResult> UnlockEjecutivo(int idEjecutivo)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			if (idEjecutivo <= 0)
			{
				return BadRequest(new { error = "El IdEjecutivo es inválido." });
			}

			bool ok = await _sesionesService.QuitarBloqueoAsync(idEjecutivo, servidorClaim);

			return ok ? Ok(new { mensaje = "Bloqueo retirado." }) : StatusCode(500, new { error = "No se removió el bloqueo del ejecutivo." });
		}

	}
}
