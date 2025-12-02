using CoorinWeb.DTOs.AuthDTOs;
using CoorinWeb.Loki.DTOs.AuthDTOs;
using CoorinWeb.Loki.Mark.Auth.Interfaces;
using GaiaLibrary.ModelsDbCollection;
using Loki.DTOs.AuthDTOs;
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
    [Tags("Auth")]
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
			Summary = "Iniciar Sesión - Yoshi",
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



		[HttpPost("reintentar-login")]
		[AllowAnonymous]
		public async Task<IActionResult> ValidateUserRetry([FromBody] AuthRequest request)
		{

			var result = await _authService.ValidateUserRetry(request);
			return Ok(result);

		}

		[HttpPost("validar-contrasenia")]
		[AllowAnonymous]
		[SwaggerOperation(
			Summary = "Validar Contraseña de Ejecutivo - Yoshi",
			Description = "Verifica si las credenciales de un ejecutivo son correctas en el servidor especificado."
		)]
		[ProducesResponseType(typeof(List<object>), StatusCodes.Status200OK)]
		[ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
		[ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
		[ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
		public async Task<IActionResult> ValidarContrasenia([FromBody] ValidatePasswordEjecutivoRequest request)
		{

			var resultado = await _authService.ValidatePasswordEjecutivoAsync(request);

			if (resultado == null || resultado.Count == 0)
			{
				return NotFound("No se encontró coincidencia para el ejecutivo.");
			}

			return Ok(new { validado = resultado });

		}

		[HttpGet("validar-sesion")]
		[SwaggerOperation(
			Summary = "Verificar Sesión Activa - Yoshi",
			Description = "Consulta si un ejecutivo tiene una sesión activa actualmente en el servidor indicado."
		)]
		[ProducesResponseType(typeof(object), StatusCodes.Status200OK)] // Devuelve un objeto anónimo { TieneSesionActiva = true/false }
		[ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
		[ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
		[ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
		public async Task<IActionResult> ValidarSesion([FromQuery] string servidor, [FromQuery] int idEjecutivo)
		{

			var tieneSesion = await _authService.ValidateExistingSessionAsync(servidor, idEjecutivo);

			if (tieneSesion is null)
			{
				return NotFound("No se encontró una sesión para el ejecutivo.");
			}

			return Ok(new { TieneSesionActiva = tieneSesion == 1 });

		}

		[HttpGet("auth-tester")]
		[SwaggerOperation(
			Summary = "Probar Autenticación - Yoshi",
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
			Summary = "Restablecer Contraseña - Yoshi",
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
                if (string.IsNullOrWhiteSpace(request.Servidor))
                {
                    return BadRequest(new { error = "El parámetro 'Servidor' es requerido." });
                }
                var resultado = await _authService.ResetPasswordAsync(request.Servidor, request);

                if (resultado == null)
                    return NotFound(new { error = "No se pudo actualizar la contraseña." });

                if (resultado is IDictionary<string, object> dict && dict.ContainsKey("Mensaje"))
                {
                    var mensaje = dict["Mensaje"]?.ToString();
                    if (!string.IsNullOrEmpty(mensaje) && mensaje.Contains("debe ser diferente", StringComparison.OrdinalIgnoreCase))
                    {
                        return BadRequest(new { error = mensaje });
                    }
                }

                return Ok(resultado);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error en ResetPasswordAsync: {ex}");
                return StatusCode(500, new { error = "Error interno del servidor." });
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

		[HttpPut("cerrar-sesion")]
		[Authorize]
		[SwaggerOperation(
			Summary = "Cerrar Sesión - Irene",
			Description = "Cierra la sesión del ejecutivo.")]
		public async Task<IActionResult> Logout([FromBody] logout request)
		{

			// Validación individual para IdEjecutivo
			if (request.IdEjecutivo == null)
			{
				return BadRequest(new { error = "El parámetro IdEjecutivo es requerido" });
			}

			// Validación individual para IdLogIngreso
			if (request.IdLogIngreso == null)
			{
				return BadRequest(new { error = "El parámetro IdLogIngreso es requerido" });
			}

			string? servidor = User.FindFirst("Servidor")?.Value;
			if (string.IsNullOrWhiteSpace(servidor))
			{
				return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
			}

			var result = await _authService.Logout(request, servidor);

			return Ok(new { mensaje = "Sesión cerrada correctamente." });

		}

	}

}
