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
using CoorinWeb.Loki.Common;
using System.Collections;

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

        public async Task<SearchResultDto> RealizaBusqueda(
     int idProducto,
     int idCartera,
     string servidor,
     bool esDetalleResultado,
     int? idConsulta = null,
     IEnumerable<ParametroDto>? parametrosExtra = null)
        {
            try
            {
                // === Cargar consultas desde BD ===
                await ConsultaGenerador.CargarDesdeBDAsync(_dbContFactory, servidor);

                // === Crear tablas de parámetros y agrupaciones ===
                var tblParametros = AccionamientosQueryHelper.Ejecutivo1.TablaParámetros;
                var tblAgrupar = AccionamientosQueryHelper.Ejecutivo1.TablaAgrupar;
                tblParametros.Rows.Clear();
                tblAgrupar.Rows.Clear();

                // === Mapear idConsulta si existe ===
                if (idConsulta.HasValue)
                {
                    var consultaRow = ConsultaGenerador.ObtenerConsulta(idConsulta.Value);
                    if (consultaRow == null)
                        throw new Exception($"No se encontró la consulta con ID {idConsulta.Value}");

                    idProducto = Convert.ToInt32(consultaRow["idProducto"]);

                    // Parámetro básico de cartera
                    tblParametros.Rows.Add("idCartera", "=", idCartera.ToString(), "AND", "int");

                    // Si tu consulta tiene otros parámetros guardados, aquí los puedes agregar
                    // Ejemplo: foreach(var p in consultaRow["Parametros"]) { tblParametros.Rows.Add(...); }
                }
                else
                {
                    // Parámetro básico de cartera
                    tblParametros.Rows.Add("idCartera", "=", idCartera.ToString(), "AND", "int");
                }

                // === Agregar parámetros extra desde el DTO ===
                if (parametrosExtra != null)
                {
                    foreach (var p in parametrosExtra)
                    {
                        tblParametros.Rows.Add(p.Concepto, p.Campo, p.Valores, "AND", p.Dato);
                    }
                }

                // === Definir agrupaciones de ejemplo ===
                tblAgrupar.Rows.Add("Cuenta", "Situación");
                tblAgrupar.Rows.Add("Producto", "120");
                tblAgrupar.Rows.Add("Conteos", "Gestiones");
                tblAgrupar.Rows.Add("Fechas", "Activación");

                // === Determinar tipo de resultado ===
                var conteo = esDetalleResultado ? Resultado.Detalle : Resultado.Contar;

                // === Generar query completo ===
                ArrayList listaColumnas = new ArrayList();
                var queryData = ConsultaGenerador.GeneraQueryCuentas(
                    idProducto,
                    tblParametros,
                    tblAgrupar,
                    conteo,
                    DateTime.Today.AddMonths(-1),
                    idCartera,
                    ref listaColumnas
                );

                string sQuery = "WAITFOR DELAY '00:00:00'; USE dbCollection SET DATEFORMAT YMD \r\n" + queryData.Query;

                // === Logging para debug ===
                Console.WriteLine("=== Conteo usado: " + conteo);
                Console.WriteLine("=== Parámetros: " + tblParametros.Rows.Count);
                Console.WriteLine("=== Agrupaciones: " + tblAgrupar.Rows.Count);
                Console.WriteLine("=== Query generado ===\n" + sQuery);

                // === Ejecutar query ===
                DataTable tblCuentas = new("Cuentas");
                using (var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection"))
                {
                    await sqlConnection.OpenAsync();
                    using (var reader = await sqlConnection.ExecuteReaderAsync(sQuery))
                    {
                        tblCuentas.Load(reader);
                    }
                }

                // === Exportar a Excel si hay resultados ===
                string rutaExcel = null;
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

                // === Convertir a lista de diccionarios ===
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
                    Mensaje = "Búsqueda terminada.",
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

        // Si estas clases son parte de tu proyecto, elimínalas de aquí.
        // Solo las incluí para que el código compilara antes.
        private class Funciones
        {
            public static void ColumnaPorcentaje(ref DataTable table, string columnName) { /* Implementación real */ }
            public static void FilaTotales(ref DataTable table) { /* Implementación real */ }
        }


        //guardar eliminar consulta
        public async Task<string> GuardarConsulta(
          int idConsulta,string nombreConsulta, int idProducto,int idCartera,DataTable parametros,DataTable agrupar, DateTime desde, int idEjecutivo,string servidor,string tipoBase)
        {
            try
            {

                if (parametros == null)
                    parametros = new DataTable();
                if (!parametros.Columns.Contains("idConsulta"))
                    parametros.Columns.Add("idConsulta", typeof(int));

                if (agrupar == null)
                    agrupar = new DataTable();
                if (!agrupar.Columns.Contains("idConsulta"))
                    agrupar.Columns.Add("idConsulta", typeof(int));

                // instancia del generador
                var consultaGenerador = new AccionamientosQueryHelper.ConsultaGenerador(_dbContFactory);

                OperacionConsulta operacion = await consultaGenerador.GuardarConsulta(
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

                return operacion switch
                {
                    OperacionConsulta.Insert => $"Consulta '{nombreConsulta}' guardada correctamente (idEjecutivo: {idEjecutivo}).",
                    OperacionConsulta.Update => $"Consulta '{nombreConsulta}' actualizada correctamente (idEjecutivo: {idEjecutivo}).",
                    OperacionConsulta.Delete => $"Consulta '{idConsulta}' eliminada correctamente (idEjecutivo: {idEjecutivo}).",
                    OperacionConsulta.Error or _ => "Error: No se pudo completar la operación."
                };
            }
            catch (Exception ex)
            {
                return $"❌ Error: {ex.Message}";
            }
        }


    }
}
