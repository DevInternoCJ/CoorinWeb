using Loki.DTOs.Informacion.PagosDTOs;
using Loki.Mark.Consulta.Informacion.Pagos.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Informacion.Pagos.Controllers
{
	[Authorize]
	[Route("api/informacion/[controller]")]
    [Tags("Consulta - Pagos")]
    [ApiController]
	public class PagosController : ControllerBase
	{
		private readonly IPagosService _pagosService;

		public PagosController(IPagosService pagosService)
		{
			_pagosService = pagosService;
		}

		[HttpPost("consultar")]
		[SwaggerOperation(
			Summary = "Consultar Pagos - Yoshi",
			Description = "Obtiene la lista de pagos de la cartera y producto especificados en el rango de fechas deseado."
		)]
		[AllowAnonymous]
		public async Task<IActionResult> ConsultarPagos([FromBody] ConsultaPagosRequest request)
		{
			string? servidorClaim = User.FindFirst("Servidor")?.Value;
			//string? servidorClaim = "Albaz";

			if (string.IsNullOrWhiteSpace(servidorClaim))
			{
				return Unauthorized(new { error = "Claim 'Servidor' no encontrado o inválido." });
			}

			var resultados = await _pagosService.ConsultarPagosAsync(servidorClaim, request);

			if (!resultados.Any())
			{
				return NotFound(new { message = "No se encontraron registros para los Pagos." });
			}
			return Ok(resultados);

		}
	}
}
