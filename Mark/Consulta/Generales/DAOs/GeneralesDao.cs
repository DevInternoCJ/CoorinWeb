using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Threading.Tasks;
using Dapper;
using Loki.DTOs.GeneralesDTOs;

using Loki.Global;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using Loki.Mark.Consulta.Informacion.Busquedas.Interfaces;
using Loki.Mark.Consulta.Generales.Interfaces;
using CoorinWeb.Loki.Common;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;

namespace Loki.Mark.Consulta.Generales.DAOs
{
    public class GeneralesDao : IGeneralesDao
    {
        private readonly IDbContextFactory _dbContextFactory;
        private readonly DaoBase _daoBase;
        private readonly ExcelGeneratorService _excelGeneratorService;

        public GeneralesDao(
            IDbContextFactory dbContextFactory,
            DaoBase daoBase,
            EjecutivoDao ejecutivoDao,
            ExcelGeneratorService excelGeneratorService)
        {
            _dbContextFactory = dbContextFactory;
            _daoBase = daoBase;
            _excelGeneratorService = excelGeneratorService;
        }

        public async Task<SearchResultDto> RealizaBusqueda(
            string servidor,
            int idCartera,
            int idProducto,
            bool esContar,
            bool esCuentas,
            bool esDetalle,
            string concepto, 
            int? idConsulta = null,
            IEnumerable<ParameterDto>? parametrosExtra = null,
            IEnumerable<AgruparDTO>? agrupamientoExtra = null)
        {
            try
            {
                await AccionamientosQueryHelper.ConsultaGenerador.CargarDesdeBDAsync(_dbContextFactory, servidor);

                var tblParametros = AccionamientosQueryHelper.Ejecutivo1.TablaParámetros;
                var tblAgrupar = AccionamientosQueryHelper.Ejecutivo1.TablaAgrupar;

                tblParametros.Rows.Clear();
                tblAgrupar.Rows.Clear();

                if (idConsulta.HasValue)
                {
                    var consultaRow = AccionamientosQueryHelper.ConsultaGenerador.ObtenerConsulta(idConsulta.Value);
                    if (consultaRow == null)
                        throw new Exception($"No se encontró la consulta con ID {idConsulta.Value}");

                    idProducto = Convert.ToInt32(consultaRow["idProducto"]);
                }

                tblParametros.Rows.Add("idCartera", "=", idCartera.ToString(), "AND", "int");

                if (parametrosExtra != null)
                {
                    foreach (var p in parametrosExtra)
                    {
                        if (p.Concepto != null && p.Campo != null && p.Valores != null)
                            tblParametros.Rows.Add(p.Concepto, p.Campo, p.Valores, "AND", p.Dato);
                    }
                }

                // Agrupamientos
                if (agrupamientoExtra != null)
                {
                    foreach (var agrupar in agrupamientoExtra)
                    {
                        if (agrupar.Campo != null)
                            tblAgrupar.Rows.Add(agrupar.Campo, agrupar.Concepto ?? "");
                    }
                }
                else
                {
                    switch (concepto)
                    {
                        case "Teléfonos":
                            tblAgrupar.Rows.Add("Clase", "Teléfonos");
                            tblAgrupar.Rows.Add("Origen", "Teléfonos");
                            break;
                        case "Gestiones":
                        case "Negociaciones":
                        case "Seguimientos":
                        case "Chats":
                            break;
                    }
                }

                Resultado conteo;
                if (esDetalle)
                    conteo = Resultado.Detalle;
                else if (esCuentas)
                    conteo = Resultado.ContarCuentas;
                else
                    conteo = Resultado.Contar;

                int idEjecutivo = 1;

                var consultaGenerador = new AccionamientosQueryHelper.ConsultaGenerador(_dbContextFactory);

                var queryData = await consultaGenerador.QueryGeneral(
                    servidor,
                    idCartera,
                    concepto, 
                    tblParametros,
                    tblAgrupar,
                    conteo,
                    DateTime.Today.AddMonths(-1),
                    idEjecutivo,
                    idConsulta ?? 0
                );

                Console.WriteLine("=== QUERY GENERADO POR QueryGeneral ===");
                Console.WriteLine(queryData);
                Console.WriteLine("=== FIN DEL QUERY ===");

                string sQuery = queryData.Trim();

                if (!sQuery.ToUpper().StartsWith("SELECT") && !sQuery.ToUpper().StartsWith("WITH"))
                {
                    sQuery = "SELECT " + sQuery;
                }

                Console.WriteLine("=== QUERY CORREGIDO ===");
                Console.WriteLine(sQuery);
                Console.WriteLine("=== FIN DEL QUERY CORREGIDO ===");

                // Asegurar terminación con punto y coma
                if (!sQuery.Trim().EndsWith(";"))
                {
                    sQuery += ";";
                }
                Console.WriteLine("=== QUERY FINAL A EJECUTAR ===");
                Console.WriteLine(sQuery);
                Console.WriteLine("=== FIN DEL QUERY FINAL ===");

                DataTable tblCuentas = new("Cuentas");

                using (var sqlConnection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
                {
                    await sqlConnection.OpenAsync();

                    try
                    {
                        // Ejecutar SET DATEFORMAT por separado
                        await sqlConnection.ExecuteAsync("SET DATEFORMAT YMD;");

                        // Ejecutar el query principal
                        using (var reader = await sqlConnection.ExecuteReaderAsync(sQuery))
                        {
                            tblCuentas.Load(reader);
                        }
                    }
                    catch (Exception sqlEx)
                    {
                        Console.WriteLine($"ERROR SQL: {sqlEx.Message}");
                        Console.WriteLine($"QUERY QUE FALLÓ: {sQuery}");
                        throw;
                    }
                }

                string? rutaExcel = null;

                if (tblCuentas.Rows.Count > 0)
                {
                    string fileName = $"{concepto}_{Guid.NewGuid():N}.xlsx";
                    string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "ExcelExports");
                    Directory.CreateDirectory(uploadsFolder);

                    string filePath = Path.Combine(uploadsFolder, fileName);
                    string sResultado = _excelGeneratorService.ExportToExcelSAX(ref tblCuentas, filePath);

                    if (!string.IsNullOrEmpty(sResultado))
                        return new SearchResultDto { Mensaje = sResultado, EsError = true };

                    rutaExcel = $"/api/busquedas/download-excel?filename={fileName}";
                }

                var datosResultado = new List<Dictionary<string, object>>();
                foreach (DataRow row in tblCuentas.Rows)
                {
                    var item = new Dictionary<string, object>();
                    foreach (DataColumn col in tblCuentas.Columns)
                        item[col.ColumnName] = row[col] == DBNull.Value ? null : row[col];
                    datosResultado.Add(item);
                }

                return new SearchResultDto
                {
                    Mensaje = "Búsqueda terminada correctamente.",
                    EsError = false,
                    TotalFilasEncontradas = tblCuentas.Rows.Count,
                    Datos = datosResultado,
                    RutaDescargaExcel = rutaExcel
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"EXCEPCIÓN GENERAL: {ex}");
                return new SearchResultDto
                {
                    Mensaje = $"Error al realizar la búsqueda: {ex.Message}",
                    EsError = true
                };
            }
        }
    }
}