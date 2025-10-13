using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs; // Asegúrate de que EjecutivoDao esté en este namespace o en el correcto
using Microsoft.Data.SqlClient;
using System.Data;
using Loki.Global;
using System.Linq;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using Loki.DTOs.BusquedaDTOs; // Corregido a BusquedasDTOs (anteriormente era BusquedaDTOs)
using System;
using System.IO;
using Dapper;
using static CoorinWeb.Loki.Global.AccionamientosQueryHelper;

namespace Loki.Mark.Consulta.Cuenta.Services
{
    public class BusquedasService : IBusqueda // Asegúrate de que IBusqueda esté definida en Loki.Mark.Consulta.Cuenta.Interfaces
    {
        private readonly IDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;
        private readonly EjecutivoDao _ejecutivoDao;
        private readonly ExcelGeneratorService _excelGeneratorService; // Inyecta el nuevo servicio
        private readonly AccionamientosQueryHelper _accionamientosQueryHelper;
        public BusquedasService(IDbContextFactory dbContFactory, DaoBase daoBase, EjecutivoDao ejecutivoDao, ExcelGeneratorService excelGeneratorService, AccionamientosQueryHelper accionamientosQueryHelper)
        {
            _dbContFactory = dbContFactory;
            _daoBase = daoBase;
            _ejecutivoDao = ejecutivoDao;
            _excelGeneratorService = excelGeneratorService;
            this._accionamientosQueryHelper = accionamientosQueryHelper;
        }

        public async Task<SearchResultDto> RealizarBusquedaAsync(SearchCriteriaDto criteria)
        {
            // Validaciones básicas de entrada
            if (string.IsNullOrWhiteSpace(criteria.Servidor))
            {
                return new SearchResultDto { Mensaje = "El nombre del servidor es obligatorio.", EsError = true };
            }
            if (criteria.IdCartera <= 0)
            {
                return new SearchResultDto { Mensaje = "El ID de la cartera es inválido.", EsError = true };
            }

            DataTable tblParametros = ConvertParameterDtosToDataTable(criteria.Parametros);
            DataTable tblAgrupar = ConvertParameterDtosToDataTable(criteria.Agrupar);

            Ejecutivo.Resultado conteoType = criteria.EsDetalleResultado ? Ejecutivo.Resultado.Detalle : Ejecutivo.Resultado.Contar;

            string sQuery = "WAITFOR DELAY '00:00:00'; USE dbCollection SET DATEFORMAT YMD \r\n" +
                            _ejecutivoDao.PreparaQueryBusqueda(
                                criteria.IdProducto,
                                tblParametros,
                                tblAgrupar,
                                conteoType,
                                criteria.DesdeFecha,
                                criteria.IdCartera
                            );

            DataTable tblCuentas = new DataTable("Cuentas");
            using (var sqlConnection = _dbContFactory.GetSqlConnection(criteria.Servidor, "Collection"))
            {
                try
                {
                    await sqlConnection.OpenAsync();
                    // Usar Dapper para llenar el DataTable es más simple que SqlCommand manual para consultas
                    // Se necesita el using Dapper al inicio del archivo para usar ExecuteReaderAsync
                    using (var reader = await sqlConnection.ExecuteReaderAsync(sQuery))
                    {
                        tblCuentas.Load(reader);
                    }
                }
                catch (SqlException ex)
                {
                    // Delegar el manejo de errores al middleware global
                    throw new Exception($"Error en la base de datos al realizar la búsqueda: {ex.Message}", ex);
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error inesperado al ejecutar la consulta: {ex.Message}", ex);
                }
            }

            if (criteria.EsDetalleResultado)
            {
                if (tblCuentas.Rows.Count == 0)
                {
                    return new SearchResultDto
                    {
                        Mensaje = "Consulta terminada. Ninguna cuenta obtenida de la consulta.",
                        EsError = false,
                        TotalFilasEncontradas = 0
                    };
                }
                else
                {
                    string fileName = $"Cuentas_{Guid.NewGuid().ToString("N")}.xlsx";
                    string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "ExcelExports");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }
                    string filePath = Path.Combine(uploadsFolder, fileName);

                    // === Usar el nuevo ExcelGeneratorService ===
                    string sResultado = _excelGeneratorService.ExportToExcelSAX(ref tblCuentas, filePath);

                    if (!string.IsNullOrEmpty(sResultado))
                    {
                        return new SearchResultDto { Mensaje = sResultado, EsError = true };
                    }

                    return new SearchResultDto
                    {
                        Mensaje = $"Consulta terminada. Libro de Excel generado con {tblCuentas.Rows.Count} cuentas.",
                        EsError = false,
                        RutaDescargaExcel = $"/api/busquedas/download-excel?filename={fileName}",
                        TotalFilasEncontradas = tblCuentas.Rows.Count
                    };
                }
            }
            else // Resultado de Conteo
            {
                if (tblCuentas.Rows.Count == 0)
                {
                    return new SearchResultDto
                    {
                        Mensaje = "No se encontraron cuentas con dichos criterios.",
                        EsError = false,
                        TotalFilasEncontradas = 0,
                        Datos = new List<Dictionary<string, object>>()
                    };
                }

                // Lógica de ordenamiento y totales (asegúrate de que Funciones esté disponible)
                string sSort = "";
                for (int iCol = 2; iCol < tblCuentas.Columns.Count; iCol++)
                {
                    sSort += $"[{tblCuentas.Columns[iCol].ColumnName}],";
                }
                sSort += "Cuentas";
                // Asumiendo que Funciones.ColumnaPorcentaje y Funciones.FilaTotales existen y funcionan con DataTable
                // Si no existen, deberás implementarlas en una clase de utilidades o aquí mismo.
                // Funciones.ColumnaPorcentaje(ref tblCuentas, "Cuentas");
                // Funciones.ColumnaPorcentaje(ref tblCuentas, "Saldo");
                // Funciones.FilaTotales(ref tblCuentas);

                var datosResultado = new List<Dictionary<string, object>>();
                foreach (DataRow row in tblCuentas.Rows)
                {
                    var item = new Dictionary<string, object>();
                    foreach (DataColumn col in tblCuentas.Columns)
                    {
                        item[col.ColumnName] = row[col];
                    }
                    datosResultado.Add(item);
                }

                return new SearchResultDto
                {
                    Mensaje = "Búsqueda terminada.",
                    EsError = false,
                    TotalFilasEncontradas = tblCuentas.Rows.Count,
                    Datos = datosResultado
                };
            }
        }

        private DataTable ConvertParameterDtosToDataTable(List<ParameterDto> parameters)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("Concepto", typeof(string));
            dt.Columns.Add("Campo", typeof(string));
            dt.Columns.Add("Valores", typeof(string));
            dt.Columns.Add("Parámetros", typeof(string));
            dt.Columns.Add("Dato", typeof(string));

            foreach (var p in parameters)
            {
                dt.Rows.Add(p.Concepto, p.Campo, p.Valor, p.Simbolo, p.Dato);
            }
            return dt;
        }

        // Si estas clases son parte de tu proyecto, elimínalas de aquí.
        // Solo las incluí para que el código compilara antes.
        private class Funciones
        {
            public static void ColumnaPorcentaje(ref DataTable table, string columnName) { /* Implementación real */ }
            public static void FilaTotales(ref DataTable table) { /* Implementación real */ }
        }

        public async Task<string> GuardarConsulta(
         int idConsulta,
         string nombreConsulta,
         int idProducto,
         int idCartera,
         DataTable parametros,
         DataTable agrupar,
         DateTime desde,
         int idEjecutivo,
         string servidor,
         string tipoBase)
        {
            try
            {

                // Asegurar columnas idConsulta

                if (parametros == null)
                    parametros = new DataTable();
                if (!parametros.Columns.Contains("idConsulta"))
                    parametros.Columns.Add("idConsulta", typeof(int));

                if (agrupar == null)
                    agrupar = new DataTable();
                if (!agrupar.Columns.Contains("idConsulta"))
                    agrupar.Columns.Add("idConsulta", typeof(int));

                // Crear instancia del generador

                var consultaGenerador = new AccionamientosQueryHelper.ConsultaGenerador(_dbContFactory);

                bool resultado = await consultaGenerador.GuardarConsulta(
                    idConsulta,
                    nombreConsulta,
                    idProducto == 0 ? DBNull.Value : idProducto,
                    idCartera == 0 ? DBNull.Value : idCartera,
                    parametros,
                    agrupar,
                    desde,
                    idEjecutivo,
                    servidor,
                    tipoBase
                );

                if (!resultado)
                    return "Error: No se pudo guardar la consulta.";

                return $"Consulta '{idConsulta}' eliminada correctamente (idEjecutivo: {idEjecutivo}).";
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }



    }
}
