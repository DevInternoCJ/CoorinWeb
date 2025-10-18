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
            int? idConsulta = null,
            IEnumerable<ParameterDto>? parametrosExtra = null,
            IEnumerable<AgruparDTO>? agrupamientoExtra = null)
        {
            try
            {
                // ========================================
                // Cargar datos de ConsultaGenerador (estático)
                // ========================================
                await AccionamientosQueryHelper.ConsultaGenerador.CargarDesdeBDAsync(_dbContextFactory, servidor);

                var tblParametros = AccionamientosQueryHelper.Ejecutivo1.TablaParámetros;
                var tblAgrupar = AccionamientosQueryHelper.Ejecutivo1.TablaAgrupar;

                tblParametros.Rows.Clear();
                tblAgrupar.Rows.Clear();

                // ========================================
                // Parámetros base
                // ========================================
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
                        tblParametros.Rows.Add(p.Concepto, p.Campo, p.Valores, "AND", p.Dato);
                }

                // Agrupaciones predefinidas
                tblAgrupar.Rows.Add("Cuenta", "Situación");
                tblAgrupar.Rows.Add("Producto", "120");
                tblAgrupar.Rows.Add("Conteos", "Gestiones");
                tblAgrupar.Rows.Add("Fechas", "Activación");

                Resultado conteo;
                if (esDetalle)
                    conteo = Resultado.Detalle;
                else if (esCuentas)
                    conteo = Resultado.ContarCuentas;
                else
                    conteo = Resultado.Contar;


                // ========================================
                // Llamada a QueryGeneral (estático)
                // ========================================
                string concepto = "Producto";
                int idEjecutivo = idCartera;
                // Crear instancia de ConsultaGenerador
                // Crear instancia de ConsultaGenerador pasando _dbContextFactory
                var consultaGenerador = new AccionamientosQueryHelper.ConsultaGenerador(_dbContextFactory);

                // Llamada async a QueryGeneral
                var queryData = await consultaGenerador.QueryGeneral(
                    servidor,            // string servidor
                    idCartera,           // int idCartera
                    concepto,            // string concepto
                    tblParametros,       // DataTable parámetros
                    tblAgrupar,          // DataTable agrupamientos
                    conteo,              // Resultado conteo
                    DateTime.Today.AddMonths(-1), // DateTime desde
                    idEjecutivo,         // int idEjecutivo
                    idConsulta ?? 0      // int idConsulta
                );


                string sQuery = "USE dbCollection SET DATEFORMAT YMD; " + queryData;

                // ========================================
                // Ejecución SQL async
                // ========================================
                DataTable tblCuentas = new("Cuentas");

                using (var sqlConnection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
                {
                    await sqlConnection.OpenAsync();
                    using (var reader = await sqlConnection.ExecuteReaderAsync(sQuery))
                    {
                        tblCuentas.Load(reader);
                    }
                }

                // ========================================
                // Exportación a Excel
                // ========================================
                string? rutaExcel = null;

                if (tblCuentas.Rows.Count > 0)
                {
                    string fileName = $"Cuentas_{Guid.NewGuid():N}.xlsx";
                    string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "ExcelExports");
                    Directory.CreateDirectory(uploadsFolder);

                    string filePath = Path.Combine(uploadsFolder, fileName);
                    string sResultado = _excelGeneratorService.ExportToExcelSAX(ref tblCuentas, filePath);

                    if (!string.IsNullOrEmpty(sResultado))
                        return new SearchResultDto { Mensaje = sResultado, EsError = true };

                    rutaExcel = $"/api/busquedas/download-excel?filename={fileName}";
                }

                // ========================================
                // Conversión DataTable a lista de diccionarios
                // ========================================
                var datosResultado = new List<Dictionary<string, object>>();
                foreach (DataRow row in tblCuentas.Rows)
                {
                    var item = new Dictionary<string, object>();
                    foreach (DataColumn col in tblCuentas.Columns)
                        item[col.ColumnName] = row[col];
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
                return new SearchResultDto
                {
                    Mensaje = $"Error al realizar la búsqueda: {ex.Message}",
                    EsError = true
                };
            }
        }
    }
}
