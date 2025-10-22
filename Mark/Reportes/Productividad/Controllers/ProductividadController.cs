// En: /Mark/Reportes/Productividad/Controllers/ProductividadController.cs
using Loki.DTOs.Reportes.ProductividadDTOs;
using Loki.Mark.Reportes.Productividad.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Loki.Mark.Reportes.Productividad.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/reportes/[controller]")]
	[SwaggerTag("Reportes")]
	public class ProductividadController : ControllerBase
	{
		private readonly IProductividadService _service;

		public ProductividadController(IProductividadService service)
		{
			_service = service;
		}

		[HttpPost("consultar")]
		[SwaggerOperation(
			Summary = "Consultar Reporte de Productividad - Yoshi",
			Description = "Obtiene los datos de productividad para una cartera y producto en un rango de fechas."
		)]
		[ProducesResponseType(typeof(IEnumerable<ProductividadDto>), 200)]
		[ProducesResponseType(typeof(object), 404)]
		public async Task<IActionResult> Consultar([FromBody] ProductividadRequestDto request)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;


			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado." });
			}

			var resultados = await _service.ConsultarProductividadAsync(servidorClaim, request);

			if (resultados == null || !resultados.Any())
			{
				return NotFound(new { message = "No se encontraron registros de productividad para los criterios especificados." });
			}

			return Ok(resultados);
		}
	}
}