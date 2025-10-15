using Loki.DTOs.HistoricoDTOs;
using Loki.Mark.Consulta.Historico.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static Loki.DTOs.HistoricoDTOs.Consulta;

namespace Loki.Mark.Consulta.Historico.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize]
	public class HistoricoController : ControllerBase
	{
		private readonly IHistoricoService _historicoService;
		private readonly ILogger<HistoricoController> _logger;

		public HistoricoController(IHistoricoService historicoService, ILogger<HistoricoController> logger)
		{
			_historicoService = historicoService;
			_logger = logger;
		}

		[HttpPost("individual")]
		[SwaggerOperation(
			Summary = "Individual - Irene",
			Description = "Obtiene el histórico."
		)]
		[ProducesResponseType(typeof(FileContentResult), 200)]
		[ProducesResponseType(typeof(BadRequestObjectResult), 400)]
		[ProducesResponseType(typeof(UnauthorizedObjectResult), 401)]
		[ProducesResponseType(typeof(ObjectResult), 500)]
		public async Task<IActionResult> BuscarIndividual([FromBody] ConsultaIndividualRequest request)
		{
			try
			{
				_logger.LogInformation("Iniciando búsqueda individual de cuenta histórica");

				if (request == null)
					return BadRequest(new { error = "La solicitud no puede ser nula" });

				if (!request.IncluirCuenta && !request.IncluirNegociaciones && !request.IncluirGestiones &&
					!request.IncluirVisitas && !request.IncluirAccionamientos && !request.IncluirPagos)
				{
					return BadRequest(new { error = "Debe seleccionar al menos un concepto a consultar" });
				}

				if (request.UsarPeriodo)
				{
					if (!request.FechaDesde.HasValue || !request.FechaHasta.HasValue)
						return BadRequest(new { error = "Debe especificar fechas cuando usa periodo" });

					if (request.FechaDesde > request.FechaHasta)
						return BadRequest(new { error = "La fecha desde no puede ser mayor que la fecha hasta" });

					if (request.FechaHasta > DateTime.Now)
						return BadRequest(new { error = "La fecha hasta no puede ser mayor a la fecha actual" });
				}

				string? servidorClaim = User.FindFirst("Servidor")?.Value;
				if (string.IsNullOrWhiteSpace(servidorClaim))
					return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

				var resultado = await _historicoService.BuscarCuentaIndividualAsync(request, servidorClaim);

				var excelResponse = await _historicoService.GenerarExcelAsync(resultado);

				return File(excelResponse.Contenido, excelResponse.ContentType, excelResponse.NombreArchivo);
			}
			catch (ArgumentException ex)
			{
				return BadRequest(new { error = ex.Message });
			}
			catch (UnauthorizedAccessException ex)
			{
				return Unauthorized(new { error = ex.Message });
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error inesperado en búsqueda individual");
				return StatusCode(500, new { error = $"Error interno del servidor: {ex.Message}" });
			}
		}


		[HttpPost("archivo")]
		[SwaggerOperation(
		 Summary = "Archivo - Irene",
		 Description = "Obtiene histórico a traves del archivo de cuentas."
	 )]

		public async Task<IActionResult> BuscarPorArchivo([FromForm] HistoricoArchivo request)
		{
			try
			{
				if (request.Archivo == null || request.Archivo.Length == 0)
					return BadRequest(new { error = "Debe enviar un archivo válido" });

				string? servidorClaim = User.FindFirst("Servidor")?.Value;
				if (string.IsNullOrWhiteSpace(servidorClaim))
					return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

				// Usar solo GUID para evitar colisiones
				string idEjecutivo = $"Temp_{Guid.NewGuid():N}";

				var resultado = await _historicoService.BuscarCuentasPorArchivoAsync(request, servidorClaim, idEjecutivo);

				var excelResponse = await _historicoService.GenerarExcelAsync(resultado);

				return File(excelResponse.Contenido, excelResponse.ContentType, excelResponse.NombreArchivo);
			}
			catch (ArgumentException ex)
			{
				return BadRequest(new { error = ex.Message });
			}
			catch (UnauthorizedAccessException ex)
			{
				return Unauthorized(new { error = ex.Message });
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error inesperado en búsqueda por archivo");
				return StatusCode(500, new { error = $"Error interno del servidor: {ex.Message}" });
			}
		}
	}
}