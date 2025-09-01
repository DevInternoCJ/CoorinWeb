// Services/HistoricoService.cs
using Loki.DTOs.HistoricoDTOs;
using Loki.Global;
using Loki.Mark.Consulta.Histórico.Interfaces;
using Microsoft.AspNetCore.Http;
using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static Loki.DTOs.HistoricoDTOs.Consulta;

namespace Loki.Mark.Consulta.Histórico.Services
{
    public class HistoricoService : IHistoricoService
    {
        private readonly IHistoricoDao _historicoDAO;
        private readonly ExcelGeneratorService _excelService;
        private readonly ILogger<HistoricoService> _logger;

        public HistoricoService(IHistoricoDao historicoDAO, ExcelGeneratorService excelService, ILogger<HistoricoService> logger)
        {
            _historicoDAO = historicoDAO;
            _excelService = excelService;
            _logger = logger;
        }

        public async Task<DataSet> BuscarCuentaIndividualAsync(ConsultaIndividualRequest request, string servidor)
        {
            try
            {
                ValidarRequest(request);

                _logger.LogInformation($"Buscando cuenta individual: {request.Cuenta} en servidor: {servidor}");

                return await _historicoDAO.BuscarCuentasIndividualAsync(request.Cuenta, request, servidor);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error buscando cuenta individual: {request.Cuenta}");
                throw;
            }
        }

        public async Task<DataSet> BuscarCuentasPorArchivoAsync(IFormFile archivo, ConsultaArchivoRequest request, string servidor)
        {
            try
            {
                ValidarRequest(request);

                _logger.LogInformation($"Procesando archivo con cuentas en servidor: {servidor}");

                var cuentas = await LeerCuentasDeArchivoAsync(archivo);

                if (!cuentas.Any())
                    throw new ArgumentException("El archivo no contiene cuentas válidas");

                _logger.LogInformation($"Se encontraron {cuentas.Count} cuentas en el archivo");

                return await _historicoDAO.BuscarCuentasPorArchivoAsync(cuentas, request, servidor);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error procesando archivo de cuentas");
                throw;
            }
        }

        public async Task<ExcelResponse> GenerarExcelAsync(DataSet data)
        {
            try
            {
                _logger.LogInformation("Generando archivo Excel desde DataSet");

                if (data == null || data.Tables.Count == 0)
                    throw new ArgumentException("No hay datos para generar el Excel");

                // Usar el NUEVO método para DataSets
                var resultado = _excelService.ExportDataSetToExcel(data);

                if (resultado == null)
                    throw new Exception("Error generando archivo Excel");

                return new ExcelResponse
                {
                    NombreArchivo = $"historico_{DateTime.Now:yyyyMMddHHmmss}.xlsx",
                    Contenido = resultado.ToArray(),
                    ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generando Excel");
                throw;
            }
        }

        private void ValidarRequest(ConsultaBaseRequest request)
        {
            if (!request.IncluirCuenta && !request.IncluirNegociaciones && !request.IncluirGestiones &&
                !request.IncluirVisitas && !request.IncluirAccionamientos && !request.IncluirPagos)
            {
                throw new ArgumentException("Debe seleccionar al menos un concepto a consultar");
            }

            if (request.UsarPeriodo)
            {
                if (!request.FechaDesde.HasValue || !request.FechaHasta.HasValue)
                    throw new ArgumentException("Debe especificar fechas cuando usa periodo");

                if (request.FechaDesde > request.FechaHasta)
                    throw new ArgumentException("La fecha desde no puede ser mayor que la fecha hasta");

                if (request.FechaHasta > DateTime.Now)
                    throw new ArgumentException("La fecha hasta no puede ser mayor a la fecha actual");
            }
        }
    
        private async Task<List<string>> LeerCuentasDeArchivoAsync(IFormFile archivo)
        {
            var cuentas = new List<string>();

            if (archivo == null || archivo.Length == 0)
                throw new ArgumentException("El archivo está vacío o no es válido");

            // Validar extensión del archivo
            var extension = Path.GetExtension(archivo.FileName).ToLower();
            if (extension != ".xlsx" && extension != ".xls")
                throw new ArgumentException("Solo se permiten archivos Excel (.xlsx, .xls)");

            using (var stream = new MemoryStream())
            {
                await archivo.CopyToAsync(stream);
                stream.Position = 0;

                try
                {
                    using (var workbook = new XLWorkbook(stream))
                    {
                        if (workbook.Worksheets.Count == 0)
                            throw new ArgumentException("El archivo Excel no contiene hojas de trabajo");

                        var worksheet = workbook.Worksheet(1); // Primera hoja

                        if (!worksheet.Rows().Any())
                            throw new ArgumentException("La hoja de trabajo está vacía");

                        var firstRowUsed = worksheet.FirstRowUsed();
                        var lastRowUsed = worksheet.LastRowUsed();

                        if (firstRowUsed == null || lastRowUsed == null)
                            throw new ArgumentException("No se encontraron datos en la hoja de trabajo");

                        for (int row = firstRowUsed.RowNumber(); row <= lastRowUsed.RowNumber(); row++)
                        {
                            var cuenta = worksheet.Cell(row, 1).GetString().Trim();
                            if (!string.IsNullOrEmpty(cuenta))
                            {
                                cuentas.Add(cuenta);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new ArgumentException($"Error leyendo el archivo Excel: {ex.Message}");
                }
            }

            return cuentas;
        }
    }
}