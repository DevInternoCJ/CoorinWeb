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

        public async Task<ExcelResponse> GenerarExcelAsync(DataSet data)
        {
            if (data == null || data.Tables.Count == 0)
                throw new ArgumentException("No hay datos para generar el Excel");

            var resultado = _excelService.ExportDataSetToExcel(data);

            return new ExcelResponse
            {
                NombreArchivo = $"Historico_{DateTime.Now:yyyyMMddHHmmss}.xlsx",
                Contenido = resultado.ToArray(),
                ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            };
        }

        public void ValidarRequest(ConsultaBaseRequest request)
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


        //historico aechivo

        //private DataTable LeerCuentasDesdeExcel(IFormFile archivo)
        //{
        //    var cuentas = new DataTable();
        //    cuentas.Columns.Add("Cuenta", typeof(string));

        //    using (var stream = archivo.OpenReadStream())
        //    using (var workbook = new ClosedXML.Excel.XLWorkbook(stream))
        //    {
        //        var worksheet = workbook.Worksheets.First(); // primera hoja
        //        foreach (var row in worksheet.RowsUsed())
        //        {
        //            var cellValue = row.Cell(1).GetString().Trim(); // primera columna
        //            if (!string.IsNullOrEmpty(cellValue))
        //                cuentas.Rows.Add(cellValue);
        //        }
        //    }

        //    return cuentas;
        //}

        private DataTable LeerCuentasDesdeExcel(IFormFile archivo)
        {
            var cuentas = new DataTable();
            cuentas.Columns.Add("Cuenta", typeof(string));

            using (var stream = archivo.OpenReadStream())
            using (var workbook = new ClosedXML.Excel.XLWorkbook(stream))
            {
                var worksheet = workbook.Worksheets.First(); // primera hoja

                var usedColumns = worksheet.FirstRowUsed().CellsUsed().Count();
                if (usedColumns > 1)
                    throw new ArgumentException("El archivo tiene más de una columna. Solo se permite una columna con cuentas.");

                foreach (var row in worksheet.RowsUsed())
                {
                    var cellValue = row.Cell(1).GetString().Trim(); // primera columna
                    if (!string.IsNullOrEmpty(cellValue))
                        cuentas.Rows.Add(cellValue);
                }
            }

            return cuentas;
        }

        public async Task<DataSet> BuscarCuentasPorArchivoAsync(HistoricoArchivo request, string servidor)
        {
            if (request.Archivo == null || request.Archivo.Length == 0)
                throw new ArgumentException("Archivo inválido");

            if (!request.IncluirCuenta && !request.IncluirNegociaciones && !request.IncluirGestiones &&
                !request.IncluirVisitas && !request.IncluirAccionamientos && !request.IncluirPagos)
                throw new ArgumentException("Debe seleccionar al menos un concepto a consultar");

            string tempTable = $"#TempHisCue_{Guid.NewGuid():N}";
            DataTable cuentas;

            var extension = Path.GetExtension(request.Archivo.FileName).ToLowerInvariant();
            if (extension == ".csv" || extension == ".txt")
            {
                cuentas = new DataTable();
                cuentas.Columns.Add("Cuenta", typeof(string));
                using (var stream = request.Archivo.OpenReadStream())
                using (var reader = new StreamReader(stream))
                {
                    while (!reader.EndOfStream)
                    {
                        string line = reader.ReadLine()?.Trim() ?? "";
                        if (!string.IsNullOrEmpty(line))
                            cuentas.Rows.Add(line);
                    }
                }
            }
            else if (extension == ".xlsx")
            {
                cuentas = LeerCuentasDesdeExcel(request.Archivo);
            }
            else
            {
                throw new ArgumentException("Formato de archivo no soportado. Solo CSV o XLSX.");
            }

            return await _historicoDAO.BuscarCuentasPorArchivoAsync(cuentas, request, servidor, tempTable);
        }


    }

}