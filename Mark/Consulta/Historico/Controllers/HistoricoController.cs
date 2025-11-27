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
using System.Text.Json;
using System.Text.Json.Serialization;
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
            Summary = "individual - Irene",
            Description = "Obtiene el histórico."
        )]
        [ProducesResponseType(typeof(object), 200)]
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

                // --- Obtener el DataSet ---
                var resultado = await _historicoService.BuscarCuentaIndividualAsync(request, servidorClaim);

                // --- Convertir cada DataTable a lista de diccionarios usando LINQ ---
                var jsonResult = resultado.Tables.Cast<DataTable>()
                    .ToDictionary(
                        table => table.TableName,
                        table => table.AsEnumerable()
                                      .Select(row => table.Columns.Cast<DataColumn>()
                                                     .ToDictionary(col => col.ColumnName, col => row[col]))
                                      .ToList()
                    );

                // --- Devolver JSON ---
                return new JsonResult(jsonResult, new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.IgnoreCycles,
                    WriteIndented = true
                });
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