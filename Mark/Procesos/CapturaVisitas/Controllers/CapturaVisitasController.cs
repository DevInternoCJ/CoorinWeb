// En: /Mark/Captura/Visitas/Controllers/CapturaVisitasController.cs
using Loki.DTOs.Captura.VisitasDTOs;
using Loki.Mark.Captura.Visitas.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;
using System.Linq;

namespace Loki.Mark.Captura.Visitas.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/captura/visitas")]
	[SwaggerTag("Captura de Visitas")]
	public class CapturaVisitasController : ControllerBase
	{
		private readonly ICapturaVisitasService _service;

		public CapturaVisitasController(ICapturaVisitasService service)
		{
			_service = service;
		}

		[HttpGet("buscar-cuenta")]
		[SwaggerOperation(
			Summary = "Buscar Cuenta y Domicilios - Yoshi",
			Description = "Busca una cuenta por su ID o Expediente y devuelve sus datos básicos junto con la lista de domicilios asociados para la captura."
		)]
		[ProducesResponseType(typeof(CuentaConDomiciliosDto), 200)]
		[ProducesResponseType(typeof(object), 404)]
		public async Task<IActionResult> BuscarCuenta(
			[FromQuery] int idCartera,
			[FromQuery] string cuentaOrExpediente,
			[FromQuery] bool esExpediente = false)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			if (string.IsNullOrWhiteSpace(servidorClaim))
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });

			var resultado = await _service.ObtenerCuentaConDomiciliosAsync(servidorClaim, idCartera, cuentaOrExpediente, esExpediente);

			if (resultado == null)
			{
				return NotFound(new { message = $"No se encontró la cuenta/expediente '{cuentaOrExpediente}' en la cartera {idCartera}." });
			}
			if (!resultado.Domicilios.Any())
			{
				// Devolvemos la cuenta con lista vacía de domicilios. El frontend decidirá si esto es un error.
				return Ok(resultado);
			}

			return Ok(resultado);
		}

		[HttpPost("guardar")]
		[SwaggerOperation(
			Summary = "Guardar Captura de Visita - Yoshi",
			Description = "Guarda los detalles de una gestión domiciliaria, incluyendo datos de la visita, del domicilio, teléfonos capturados y datos CFE (si aplica)."
		)]
		[ProducesResponseType(typeof(object), 200)] // Respuesta de éxito simple
		[ProducesResponseType(typeof(object), 400)] // Error de validación o error controlado por SP
		public async Task<IActionResult> GuardarVisita([FromBody] CapturaVisitaRequestDto request)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			if (string.IsNullOrWhiteSpace(servidorClaim))
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });

			var (exitoso, mensaje) = await _service.GuardarVisitaAsync(servidorClaim, request, User);

			if (!exitoso)
			{
				// Errores de validación o errores controlados por SP devuelven 400
				return BadRequest(new { error = mensaje });
			}

			// Éxito
			return Ok(new { message = mensaje });
		}
	}
}