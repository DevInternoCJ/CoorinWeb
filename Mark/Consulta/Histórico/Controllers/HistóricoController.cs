using Loki.DTOs.HistoricoDTOs;
using Loki.Mark.Consulta.Histórico.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static Loki.DTOs.HistoricoDTOs.Consulta;

namespace Loki.Mark.Consulta.Histórico.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HistóricoController : ControllerBase
    {
        private readonly IHistoricoService _historicoService;
        private readonly ILogger<HistóricoController> _logger;

        public HistóricoController(IHistoricoService historicoService, ILogger<HistóricoController> logger)
        {
            _historicoService = historicoService;
            _logger = logger;
        }

        [HttpPost("individual")]
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

                // Validar que al menos un concepto esté seleccionado
                if (!request.IncluirCuenta && !request.IncluirNegociaciones && !request.IncluirGestiones &&
                    !request.IncluirVisitas && !request.IncluirAccionamientos && !request.IncluirPagos)
                {
                    return BadRequest(new { error = "Debe seleccionar al menos un concepto a consultar" });
                }

                // Validar periodo si está activado
                if (request.UsarPeriodo)
                {
                    if (!request.FechaDesde.HasValue || !request.FechaHasta.HasValue)
                        return BadRequest(new { error = "Debe especificar fechas cuando usa periodo" });

                    if (request.FechaDesde > request.FechaHasta)
                        return BadRequest(new { error = "La fecha desde no puede ser mayor que la fecha hasta" });

                    if (request.FechaHasta > DateTime.Now)
                        return BadRequest(new { error = "La fecha hasta no puede ser mayor a la fecha actual" });
                }

                // Obtener servidor desde el token
                string? servidorClaim = User.FindFirst("Servidor")?.Value;
                if (string.IsNullOrWhiteSpace(servidorClaim))
                {
                    return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
                }

                _logger.LogInformation($"Procesando en servidor: {servidorClaim}");

                var resultado = await _historicoService.BuscarCuentaIndividualAsync(request, servidorClaim);

                _logger.LogInformation($"Búsqueda completada. Tablas encontradas: {resultado.Tables.Count}");

                // Log detallado de cada tabla
                foreach (DataTable table in resultado.Tables)
                {
                    _logger.LogInformation($"Tabla: {table.TableName}, Filas: {table.Rows.Count}, Columnas: {table.Columns.Count}");
                }

                var excelResponse = await _historicoService.GenerarExcelAsync(resultado);

                _logger.LogInformation($"Archivo Excel generado: {excelResponse.NombreArchivo}, Tamaño: {excelResponse.Contenido.Length} bytes");

                return File(excelResponse.Contenido, excelResponse.ContentType, excelResponse.NombreArchivo);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Validación fallida en búsqueda individual");
                return BadRequest(new { error = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning(ex, "Error de autenticación en búsqueda individual");
                return Unauthorized(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error inesperado en búsqueda individual");
                return StatusCode(500, new { error = $"Error interno del servidor: {ex.Message}" });
            }
        }

        //[HttpPost("archivo")]
        //[RequestSizeLimit(100_000_000)] // 100MB
        //[ProducesResponseType(typeof(FileContentResult), 200)]
        //[ProducesResponseType(typeof(BadRequestObjectResult), 400)]
        //[ProducesResponseType(typeof(UnauthorizedObjectResult), 401)]
        //[ProducesResponseType(typeof(ObjectResult), 500)]
        //public async Task<IActionResult> BuscarPorArchivo(
        //    IFormFile archivo,
        //    [FromForm] int idCartera,
        //    [FromForm] bool incluirCuenta = false,
        //    [FromForm] bool incluirNegociaciones = false,
        //    [FromForm] bool incluirVisitas = false,
        //    [FromForm] bool incluirGestiones = false,
        //    [FromForm] bool incluirAccionamientos = false,
        //    [FromForm] bool incluirPagos = false,
        //    [FromForm] bool usarPeriodo = false,
        //    [FromForm] DateTime? fechaDesde = null,
        //    [FromForm] DateTime? fechaHasta = null)
        //{
        //    try
        //    {
        //        _logger.LogInformation("Iniciando búsqueda por archivo de cuentas históricas");

        //        if (archivo == null || archivo.Length == 0)
        //            return BadRequest(new { error = "Debe seleccionar an archivo válido" });

        //        // Validar que al menos un concepto esté seleccionado
        //        if (!incluirCuenta && !incluirNegociaciones && !incluirGestiones &&
        //            !incluirVisitas && !incluirAccionamientos && !incluirPagos)
        //        {
        //            return BadRequest(new { error = "Debe seleccionar al menos un concepto a consultar" });
        //        }

        //        // Validar periodo si está activado
        //        if (usarPeriodo)
        //        {
        //            if (!fechaDesde.HasValue || !fechaHasta.HasValue)
        //                return BadRequest(new { error = "Debe especificar fechas cuando usa periodo" });

        //            if (fechaDesde > fechaHasta)
        //                return BadRequest(new { error = "La fecha desde no puede ser mayor que la fecha hasta" });

        //            if (fechaHasta > DateTime.Now)
        //                return BadRequest(new { error = "La fecha hasta no puede ser mayor a la fecha actual" });
        //        }

        //        // Obtener servidor desde el token
        //        string? servidorClaim = User.FindFirst("Servidor")?.Value;
        //        if (string.IsNullOrWhiteSpace(servidorClaim))
        //        {
        //            return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
        //        }

        //        var request = new ConsultaArchivoRequest
        //        {
        //            IdCartera = idCartera,
        //            IncluirCuenta = incluirCuenta,
        //            IncluirNegociaciones = incluirNegociaciones,
        //            IncluirVisitas = incluirVisitas,
        //            IncluirGestiones = incluirGestiones,
        //            IncluirAccionamientos = incluirAccionamientos,
        //            IncluirPagos = incluirPagos,
        //            UsarPeriodo = usarPeriodo,
        //            FechaDesde = fechaDesde,
        //            FechaHasta = fechaHasta
        //        };

        //        var resultado = await _historicoService.BuscarCuentasPorArchivoAsync(archivo, request, servidorClaim);

        //        _logger.LogInformation($"Búsqueda por archivo completada. Tablas encontradas: {resultado.Tables.Count}");

        //        var excelResponse = await _historicoService.GenerarExcelAsync(resultado);

        //        _logger.LogInformation($"Archivo Excel generado: {excelResponse.NombreArchivo}");

        //        return File(excelResponse.Contenido, excelResponse.ContentType, excelResponse.NombreArchivo);
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        _logger.LogWarning(ex, "Validación fallida en búsqueda por archivo");
        //        return BadRequest(new { error = ex.Message });
        //    }
        //    catch (UnauthorizedAccessException ex)
        //    {
        //        _logger.LogWarning(ex, "Error de autenticación en búsqueda por archivo");
        //        return Unauthorized(new { error = ex.Message });
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error inesperado en búsqueda por archivo");
        //        return StatusCode(500, new { error = "Error interno del servidor al procesar el archivo" });
        //    }
        //}

        private List<Dictionary<string, object>> ConvertDataTableToDictionary(DataTable table)
        {
            var result = new List<Dictionary<string, object>>();

            foreach (DataRow row in table.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in table.Columns)
                {
                    dict[col.ColumnName] = row[col] == DBNull.Value ? null : row[col];
                }
                result.Add(dict);
            }

            return result;
        }
    }
}