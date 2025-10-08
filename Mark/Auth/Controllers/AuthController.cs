using CoorinWeb.DTOs.AuthDTOs;
using CoorinWeb.Loki.DTOs.AuthDTOs;
using CoorinWeb.Loki.Mark.Auth.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Annotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Loki.Mark.Auth.Controllers
{

	[ApiController]
	[Route("api/[controller]")]
	[SwaggerTag("Controladores relacionados con el inicio y renovación de sesión/tokens.")]

	//[Authorize]
	public class AuthController : ControllerBase
	{
		private readonly IAuthInterfaces _authService;
		private readonly IConfiguration _configuration;

		private readonly string? _secretKey;
		private readonly string? _issuer;
		private readonly string? _audience;

		public AuthController(IAuthInterfaces authService, IConfiguration configuration)
		{
			_configuration = configuration;
			_authService = authService;

			_secretKey = _configuration["JwtSettings:Key"];
			_issuer = _configuration["JwtSettings:Issuer"];
			_audience = _configuration["JwtSettings:Audience"];
		}

		[HttpPost("login")]
		[AllowAnonymous]
		[SwaggerOperation(
			Summary = "Iniciar Sesión",
			Description = "Verifica las credenciales proporcionadas y, de ser válidas, " +
			"devuelve la información del ejecutivo junto con su JSON Web Token (JWT). El servidor " +
			"escogido es agregado al JWT como claim, por lo que ya no será necesario enviarlo como " +
			"parámetro al resto de endpoints."
		)]
		public async Task<IActionResult> Login([FromBody] AuthRequest request)
		{
			// Validación básica: el campo "Servidor" es obligatorio para la autenticación.
			if (string.IsNullOrWhiteSpace(request.Servidor))
			{
				return BadRequest(new { error = "Servidor es obligatorio." });
			}

			// Obtiene la dirección IP del cliente desde el contexto HTTP.
			string? clientIP = HttpContext.Connection.RemoteIpAddress?.ToString();

			// Asigna la IP del cliente al objeto de solicitud.
			request.IP = clientIP;

			try
			{
				// Intenta validar las credenciales del usuario llamando al servicio de autenticación
				var loginResultRaw = await _authService.ValidateUser(request);

				// El resultado es una lista, obtenemos el primer elemento
				var loginResultList = loginResultRaw as IList<dynamic>;
				var loginResult = loginResultList?.FirstOrDefault();

				// Si no hay respuesta del servicio (puede deberse a un error de conexión, por ejemplo)
				if (loginResult == null)
				{
					return BadRequest(new { Mensaje = "No se recibió respuesta de la base de datos." });
				}

				// Si la base de datos respondió con un mensaje de error, o si la sesión expiró o ya está activa
				if (!string.IsNullOrEmpty(loginResult.Mensaje) || Convert.ToBoolean(loginResult.Expiro) || Convert.ToBoolean(loginResult.Sesion))
				{
					return BadRequest(new { loginResult });
				}

				// Si se obtuvo un idEjecutivo válido, se considera un inicio de sesión exitoso
				if (loginResult.idEjecutivo != null)
				{
					// Genera un JWT usando la información del usuario (incluyendo el campo Servidor)
					var token = GenerateJwtToken(request);

					// Asigna el token al objeto de respuesta
					loginResult.Token = token;

					return Ok(new { ejecutivo = loginResult });
				}
				else
				{
					// Si no se obtuvo un idEjecutivo, el login falla sin explicación clara, así que se devuelve Unauthorized
					return Unauthorized(new { Mensaje = "Ocurrió un error inesperado." });
				}
			}
			catch (ArgumentException ex)
			{
				// Se devuelve un error BadRequest si la excepción fue causada por argumentos inválidos
				return BadRequest(new { error = ex.Message });
			}
			catch (Exception ex)
			{
				// Cualquier otra excepción no controlada se devuelve como error interno del servidor
				return StatusCode(500, new { error = "Ocurrió un error interno.", detalle = ex.Message });
			}
		}



		[HttpPost("reintentar-login")]
		[AllowAnonymous]
		public async Task<IActionResult> ValidateUserRetry([FromBody] AuthRequest request)
		{
			try
			{
				var result = await _authService.ValidateUserRetry(request);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error interno del servidor: {ex.Message}");
			}
		}

		[HttpPost("validar-contrasenia")]
		[AllowAnonymous]
		[SwaggerOperation(
			Summary = "Validar Contraseña de Ejecutivo",
			Description = "Verifica si las credenciales de un ejecutivo son correctas en el servidor especificado."
		)]
		[ProducesResponseType(typeof(List<object>), StatusCodes.Status200OK)]
		[ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
		[ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
		[ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
		public async Task<IActionResult> ValidarContrasenia([FromBody] ValidatePasswordEjecutivoRequest request)
		{
			try
			{
				var resultado = await _authService.ValidatePasswordEjecutivoAsync(request);

				if (resultado == null || resultado.Count == 0)
				{
					return NotFound("No se encontró coincidencia para el ejecutivo.");
				}

				return Ok(resultado);
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
			catch (Exception ex)
			{
				Console.WriteLine($"❌ Error en ValidarContrasenia: {ex.Message}");
				return StatusCode(500, "Error interno del servidor.");
			}
		}

		[HttpGet("validar-sesion")]
		[SwaggerOperation(
			Summary = "Verificar Sesión Activa",
			Description = "Consulta si un ejecutivo tiene una sesión activa actualmente en el servidor indicado."
		)]
		[ProducesResponseType(typeof(object), StatusCodes.Status200OK)] // Devuelve un objeto anónimo { TieneSesionActiva = true/false }
		[ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
		[ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
		[ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
		public async Task<IActionResult> ValidarSesion([FromQuery] string servidor, [FromQuery] int idEjecutivo)
		{
			try
			{
				var tieneSesion = await _authService.ValidateExistingSessionAsync(servidor, idEjecutivo);

				if (tieneSesion is null)
				{
					return NotFound("No se encontró una sesión para el ejecutivo.");
				}

				return Ok(new { TieneSesionActiva = tieneSesion == 1 });
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
			catch (Exception ex)
			{
				Console.WriteLine($"❌ Error en ValidarSesion: {ex.Message}");
				return StatusCode(500, "Error interno del servidor.");
			}
		}

		[HttpGet("auth-tester")]
		[SwaggerOperation(
			Summary = "Probar Autenticación",
			Description = "Verifica que el token JWT sea válido. Solo retorna un mensaje de éxito si el JWT es correcto."
		)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public IActionResult AuthTest()
		{
			return Ok("Autenticación exitosa");

		}


		[HttpPost("restablecer-contrasenia")]
		[AllowAnonymous]
		[SwaggerOperation(
			Summary = "Restablecer Contraseña",
			Description = "Ejecuta un procedimiento almacenado para restablecer la contraseña de un ejecutivo en el servidor indicado."
		)]
		[ProducesResponseType(typeof(object), StatusCodes.Status200OK)] // Depende del tipo de resultado que retorne el servicio
		[ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
		[ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
		[ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
		public async Task<IActionResult> RestablecerContrasenia([FromBody] ReseteaContra request)
		{
			try
			{
				string? servidorClaim = User.FindFirst("Servidor")?.Value;

				if (string.IsNullOrWhiteSpace(servidorClaim))
				{
					return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
				}

				var resultado = await _authService.ResetPasswordAsync(servidorClaim, request);

				if (resultado == null)
					return NotFound("No se pudo actualizar la contraseña.");

				return Ok(resultado);
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
			catch (Exception ex)
			{
				Console.WriteLine($"❌ Error en ResetPasswordAsync: {ex}");
				return StatusCode(500, "Error interno del servidor.");
			}
		}

		/// <summary>
		/// Genera un token JWT para un usuario autenticado con base en su información y configuración de seguridad.
		/// </summary>
		private string GenerateJwtToken(AuthRequest user)
		{
			if (string.IsNullOrEmpty(_secretKey))
			{
				throw new InvalidOperationException("JWT Secret is not configured.");
			}

			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
			var secureId = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

			var claims = new List<Claim>
			   {
				   new (JwtRegisteredClaimNames.Sub, user.Usuario!),
				   new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				   new ("Usuario", user.Usuario ?? string.Empty),
				   new ("Servidor", user.Servidor ?? string.Empty) // Agregar el campo "Servidor" a los claims
               };

			var tokenBody = new JwtSecurityToken(
				issuer: _issuer,
				audience: _audience,
				claims: claims,
				expires: DateTime.UtcNow.AddHours(int.Parse(_configuration["JwtSettings:ExpiryHours"] ?? "1")),
				signingCredentials: secureId);

			var token = new JwtSecurityTokenHandler().WriteToken(tokenBody);

			return token;
		}

	}
}
