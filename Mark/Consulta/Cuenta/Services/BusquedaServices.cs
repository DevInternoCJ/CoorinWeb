using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Microsoft.Data.SqlClient;
using System.Data;
using Loki.Global;
using System.Linq;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using Loki.DTOs.BusquedaDTOs;
using System;
using System.IO;
using Dapper;
using static CoorinWeb.Loki.Global.AccionamientosQueryHelper;
using CoorinWeb.Loki.Common;
using System.Collections;
using System.Text.RegularExpressions;

namespace Loki.Mark.Consulta.Cuenta.Services
{
    public class BusquedasService : IBusqueda
    {
        private readonly IDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;
        private readonly EjecutivoDao _ejecutivoDao;
        private readonly ExcelGeneratorService _excelGeneratorService;
        private readonly AccionamientosQueryHelper _accionamientosQueryHelper;

        public BusquedasService(IDbContextFactory dbContFactory, DaoBase daoBase, EjecutivoDao ejecutivoDao,
                              ExcelGeneratorService excelGeneratorService, AccionamientosQueryHelper accionamientosQueryHelper)
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
      IEnumerable<ParametroDto>? parametrosExtra = null,
      IEnumerable<AgruparDto>? agruparExtra = null)
        {
            try
            {
                Console.WriteLine("🚨🚨🚨 INICIO REALIZABUSQUEDA 🚨🚨🚨");
                Console.WriteLine($"idConsulta recibido: {idConsulta}");

                // === Cargar consultas desde BD ===
                await ConsultaGenerador.CargarDesdeBDAsync(_dbContFactory, servidor);

                // === CREAR TABLAS CON LA ESTRUCTURA QUE ESPERA GeneraQueryCuentas ===
                DataTable tblParametros = new DataTable();
                tblParametros.Columns.Add("Concepto", typeof(string));
                tblParametros.Columns.Add("Campo", typeof(string));
                tblParametros.Columns.Add("Valores", typeof(string));
                tblParametros.Columns.Add("Parámetros", typeof(string));
                tblParametros.Columns.Add("Dato", typeof(string));

                DataTable tblAgrupar = new DataTable();
                tblAgrupar.Columns.Add("Campo", typeof(string));
                tblAgrupar.Columns.Add("Concepto", typeof(string));

                DateTime desdeFecha = DateTime.Today.AddMonths(-1);

                // === Si hay idConsulta, cargar parámetros y agrupaciones desde BD ===
                if (idConsulta.HasValue)
                {
                    Console.WriteLine($"=== PROCESANDO idConsulta: {idConsulta.Value} ===");

                    var consultaRow = ConsultaGenerador.ObtenerConsulta(idConsulta.Value);
                    if (consultaRow == null)
                        throw new Exception($"No se encontró la consulta con ID {idConsulta.Value}");

                    idProducto = Convert.ToInt32(consultaRow["idProducto"]);
                    idCartera = Convert.ToInt32(consultaRow["idCartera"]);
                    desdeFecha = Convert.ToDateTime(consultaRow["Desde"]);

                    Console.WriteLine($"=== Valores actualizados: Producto={idProducto}, Cartera={idCartera}, Desde={desdeFecha}");

                    // Cargar parámetros de la consulta
                    await CargarParametrosDesdeBD(idConsulta.Value, tblParametros, servidor);

                    // Cargar agrupaciones de la consulta  
                    await CargarAgrupacionesDesdeBD(idConsulta.Value, tblAgrupar, servidor);

                    DebugDataTables(tblParametros, tblAgrupar);
                    Console.WriteLine($"=== Parámetros cargados: {tblParametros.Rows.Count}");
                    Console.WriteLine($"=== Agrupaciones cargadas: {tblAgrupar.Rows.Count}");
                }
                else
                {
                    Console.WriteLine("=== NO hay idConsulta, usando parámetros por defecto ===");
                    // Parámetro básico de cartera cuando no hay idConsulta
                    tblParametros.Rows.Add("idCartera", "=", idCartera.ToString(), "AND", "int");
                }

                // === Agregar parámetros extra ===
                ProcesarParametrosExtra(parametrosExtra, tblParametros);

                // === AGREGAR AGRUPACIONES EXTRA DESDE EL NUEVO PARÁMETRO ===
                if (agruparExtra != null && agruparExtra.Any())
                {
                    foreach (var agrupar in agruparExtra)
                    {
                        // Verificar si ya existe esta agrupación
                        if (!AgrupacionExiste(tblAgrupar, agrupar.Campo, agrupar.Concepto))
                        {
                            tblAgrupar.Rows.Add(agrupar.Campo, agrupar.Concepto);
                            Console.WriteLine($"✅ Agrupación extra cargada desde agruparExtra: {agrupar.Campo}, {agrupar.Concepto}");
                        }
                        else
                        {
                            Console.WriteLine($"⚠️ Agrupación duplicada omitida: {agrupar.Campo}, {agrupar.Concepto}");
                        }
                    }
                }

                // === AGREGAR AGRUPACIONES EXTRA DESDE PARAMETROSEXTRA ===
                // Buscar agrupaciones en los parámetros extra (si vienen en el mismo objeto)
                if (parametrosExtra != null && parametrosExtra.Any())
                {
                    // Buscar parámetros que sean de tipo agrupación
                    var agrupacionesExtra = parametrosExtra.Where(p =>
                        p.Concepto?.ToLower() == "agrupar" ||
                        p.Campo?.ToLower() == "agrupar" ||
                        !string.IsNullOrEmpty(p.Parámetros) && p.Parámetros.ToLower().Contains("agrupar"));

                    foreach (var agrupar in agrupacionesExtra)
                    {
                        // Intentar extraer campo y concepto del parámetro
                        string campo = agrupar.Campo;
                        string concepto = agrupar.Concepto;

                        // Si el campo es "agrupar", usar valores para el campo y parámetros para el concepto
                        if (agrupar.Campo?.ToLower() == "agrupar")
                        {
                            campo = agrupar.Valores;
                            concepto = agrupar.Parámetros;
                        }
                        // Si el concepto es "agrupar", usar campo para el campo y valores para el concepto
                        else if (agrupar.Concepto?.ToLower() == "agrupar")
                        {
                            concepto = agrupar.Valores;
                            // campo ya está en agrupar.Campo
                        }

                        if (!string.IsNullOrEmpty(campo) && !string.IsNullOrEmpty(concepto))
                        {
                            // Verificar si ya existe esta agrupación
                            if (!AgrupacionExiste(tblAgrupar, campo, concepto))
                            {
                                tblAgrupar.Rows.Add(campo, concepto);
                                Console.WriteLine($"✅ Agrupación extra cargada desde parámetro: {campo}, {concepto}");
                            }
                            else
                            {
                                Console.WriteLine($"⚠️ Agrupación duplicada omitida desde parámetro: {campo}, {concepto}");
                            }
                        }
                    }
                }

                Console.WriteLine("=== PARÁMETROS FINALES ===");
                foreach (DataRow row in tblParametros.Rows)
                {
                    Console.WriteLine($"Concepto: {row["Concepto"]}, Campo: {row["Campo"]}, Valores: {row["Valores"]}, Parámetros: {row["Parámetros"]}, Dato: {row["Dato"]}");
                }

                Console.WriteLine("=== AGRUPACIONES FINALES ===");
                foreach (DataRow row in tblAgrupar.Rows)
                {
                    Console.WriteLine($"Campo: {row["Campo"]}, Concepto: {row["Concepto"]}");
                }

                // === Determinar tipo de resultado ===
                var conteo = esDetalleResultado ? Resultado.Detalle : Resultado.Contar;

                // === Generar query completo ===
                ArrayList listaColumnas = new ArrayList();
                var queryData = ConsultaGenerador.GeneraQueryCuentas(
                    idProducto,
                    tblParametros,
                    tblAgrupar,
                    conteo,
                    desdeFecha,
                    idCartera,
                    ref listaColumnas
                );

                string sQuery = "WAITFOR DELAY '00:00:00'; USE dbCollection SET DATEFORMAT YMD \r\n" + queryData.Query;

                // === Logging para debug ===
                Console.WriteLine("=== Conteo usado: " + conteo);
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

                // convertir a lista de diccionarios y enmascarar el número de cuenta
                var datosResultado = new List<Dictionary<string, object>>();
                foreach (DataRow row in tblCuentas.Rows)
                {
                    var item = new Dictionary<string, object>();
                    foreach (DataColumn col in tblCuentas.Columns)
                    {
                        var value = row[col];

                        if (col.ColumnName.Equals("Cuenta", StringComparison.OrdinalIgnoreCase) &&
                            value != null && value != DBNull.Value)
                        {
                            string cuenta = value.ToString();
                            if (cuenta.Length > 4)
                            {
                                value = new string('X', cuenta.Length - 5) + cuenta.Substring(cuenta.Length - 5);
                            }
                        }
                        item[col.ColumnName] = value;
                    }
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
                Console.WriteLine($"=== ERROR: {ex.Message}");
                Console.WriteLine($"=== STACK TRACE: {ex.StackTrace}");
                return new SearchResultDto
                {
                    Mensaje = $"Error al realizar la búsqueda: {ex.Message}",
                    EsError = true
                };
            }
        }

        // === Método auxiliar para verificar duplicados ===
        private bool AgrupacionExiste(DataTable tblAgrupar, string campo, string concepto)
        {
            foreach (DataRow row in tblAgrupar.Rows)
            {
                if (row["Campo"].ToString() == campo && row["Concepto"].ToString() == concepto)
                {
                    return true;
                }
            }
            return false;
        }
        // === Métodos para cargar desde BD ===

        private async Task CargarParametrosDesdeBD(int idConsulta, DataTable tblParametros, string servidor)
        {
            try
            {
                Console.WriteLine("=== CARGANDO PARÁMETROS DESDE BD ===");

                string query = @"
                    SELECT Concepto, Campo, Valores, Dato 
                    FROM ConsultaParámetros 
                    WHERE idConsulta = @idConsulta";

                using (var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection"))
                {
                    await sqlConnection.OpenAsync();
                    var parametros = await sqlConnection.QueryAsync<dynamic>(
                        query, new { idConsulta });

                    foreach (var param in parametros)
                    {
                        string concepto = param.Concepto;
                        string campo = param.Campo;
                        string valores = param.Valores;
                        string dato = param.Dato;

                        Console.WriteLine($"=== VALOR ORIGINAL: {valores} ===");

                        // Limpiar y formatear valores
                        string valoresLimpios = LimpiarValoresParametro(valores, dato);
                        Console.WriteLine($"=== VALOR LIMPIO: {valoresLimpios} ===");

                        // CREAR NUEVA FILA - USANDO LA COLUMNA "Parámetros"
                        DataRow newRow = tblParametros.NewRow();
                        newRow["Concepto"] = concepto;
                        newRow["Campo"] = campo;
                        newRow["Valores"] = valoresLimpios;
                        newRow["Parámetros"] = "AND";  // ← USAR "Parámetros"
                        newRow["Dato"] = dato;

                        tblParametros.Rows.Add(newRow);
                        Console.WriteLine($"✅ Parámetro cargado: {concepto}, {campo}, {valoresLimpios}, {dato}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error al cargar parámetros desde BD: {ex.Message}");
                throw;
            }
        }

        private async Task CargarAgrupacionesDesdeBD(int idConsulta, DataTable tblAgrupar, string servidor)
        {
            try
            {
                Console.WriteLine("=== CARGANDO AGRUPACIONES DESDE BD ===");

                string query = @"
                    SELECT Campo, Concepto 
                    FROM ConsultaAgrupar 
                    WHERE idConsulta = @idConsulta";

                using (var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection"))
                {
                    await sqlConnection.OpenAsync();
                    var agrupaciones = await sqlConnection.QueryAsync<dynamic>(
                        query, new { idConsulta });

                    foreach (var agrupar in agrupaciones)
                    {
                        string campo = agrupar.Campo;
                        string concepto = agrupar.Concepto;

                        DataRow newRow = tblAgrupar.NewRow();
                        newRow["Campo"] = campo;
                        newRow["Concepto"] = concepto;

                        tblAgrupar.Rows.Add(newRow);
                        Console.WriteLine($"✅ Agrupación cargada: {campo}, {concepto}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error al cargar agrupaciones desde BD: {ex.Message}");
                throw;
            }
        }

        // === Método para limpiar valores de parámetros ===
        private string LimpiarValoresParametro(string valores, string tipoDato)
        {
            if (string.IsNullOrEmpty(valores))
                return valores;

            // Extraer solo los valores entre comillas
            var matches = Regex.Matches(valores, @"\""([^\""]+)\""");
            string valoresLimpios = "";

            if (matches.Count > 0)
            {
                if (tipoDato?.ToLower() == "char")
                {
                    // SOLO los valores, SIN comillas simples - el método GeneraQueryCuentas las agregará
                    valoresLimpios = string.Join(", ", matches.Cast<Match>()
                        .Select(m => m.Groups[1].Value));  // ← QUITAR las comillas simples
                }
                else
                {
                    valoresLimpios = string.Join(", ", matches.Cast<Match>()
                        .Select(m => m.Groups[1].Value));
                }
            }
            else
            {
                valoresLimpios = valores; // Fallback
            }

            Console.WriteLine($"🔧 Valores transformados: {valores} -> {valoresLimpios}");
            return valoresLimpios;
        }

        // === Método para procesar parámetros extra ===
        private void ProcesarParametrosExtra(IEnumerable<ParametroDto> parametrosExtra, DataTable tblParametros)
        {
            if (parametrosExtra == null || !parametrosExtra.Any())
                return;

            foreach (var p in parametrosExtra)
            {
                string valoresProcesados = p.Valores;

                // Procesar según el concepto y campo
                if (p.Concepto == "Cuenta" && p.Campo == "Situación")
                {
                    // Si viene texto como "= Niegan Acreditado", extraer solo el ID
                    if (p.Valores.Contains("=") && !string.IsNullOrEmpty(p.Parámetros))
                    {
                        valoresProcesados = p.Parámetros; // Usar el ID que viene en "parámetros"
                        Console.WriteLine($"🔧 Parámetro extra procesado: {p.Valores} -> {valoresProcesados}");
                    }
                }

                tblParametros.Rows.Add(p.Concepto, p.Campo, valoresProcesados, "AND", p.Dato);
                Console.WriteLine($"✅ Parámetro extra cargado: {p.Concepto}, {p.Campo}, {valoresProcesados}, {p.Dato}");
            }
        }
        // === Método de debug ===
        private void DebugDataTables(DataTable parametros, DataTable agrupar)
        {
            Console.WriteLine("=== DEBUG PARAMETROS TABLE ===");
            Console.WriteLine($"Columns: {parametros.Columns.Count}");
            foreach (DataColumn col in parametros.Columns)
            {
                Console.WriteLine($"Column: {col.ColumnName}, Type: {col.DataType}");
            }
            Console.WriteLine($"Rows: {parametros.Rows.Count}");

            for (int i = 0; i < parametros.Rows.Count; i++)
            {
                var row = parametros.Rows[i];
                Console.WriteLine($"Row {i}:");
                Console.WriteLine($"  Concepto='{row["Concepto"]}'");
                Console.WriteLine($"  Campo='{row["Campo"]}'");
                Console.WriteLine($"  Valores='{row["Valores"]}'");
                Console.WriteLine($"  Parámetros='{row["Parámetros"]}'");  // ← USAR "Parámetros"
                Console.WriteLine($"  Dato='{row["Dato"]}'");
            }

            Console.WriteLine("=== DEBUG AGRUPAR TABLE ===");
            Console.WriteLine($"Columns: {agrupar.Columns.Count}");
            foreach (DataColumn col in agrupar.Columns)
            {
                Console.WriteLine($"Column: {col.ColumnName}, Type: {col.DataType}");
            }
            Console.WriteLine($"Rows: {agrupar.Rows.Count}");

            for (int i = 0; i < agrupar.Rows.Count; i++)
            {
                var row = agrupar.Rows[i];
                Console.WriteLine($"Row {i}:");
                Console.WriteLine($"  Campo='{row["Campo"]}'");
                Console.WriteLine($"  Concepto='{row["Concepto"]}'");
            }

            Console.WriteLine("=== FIN DEBUG ===");
        }

        public static class Funciones
        {
            public static void ColumnaPorcentaje(ref DataTable tblTabla, string NombreColumna)
            {
                if (!tblTabla.Columns.Contains(NombreColumna))
                    return;

                DataColumn col = tblTabla.Columns[NombreColumna];

                // Solo permitir columnas numéricas
                if (col.DataType != typeof(int) && col.DataType != typeof(double) && col.DataType != typeof(decimal))
                    return;

                string sTotal = tblTabla.Compute("SUM([" + NombreColumna + "])", "").ToString();
                double total = string.IsNullOrEmpty(sTotal) ? 0 : Convert.ToDouble(sTotal);

                string nuevaColumna = NombreColumna + " %";
                if (!tblTabla.Columns.Contains(nuevaColumna))
                {
                    tblTabla.Columns.Add(
                        nuevaColumna,
                        typeof(double),
                        total == 0 ? "0" : NombreColumna + " / " + total + " * 100"
                    );
                }
            }

            // (divide entre 2, multiplica por 100)
            public static void ColumnaPorcentaje2(ref DataTable tblTabla, string NombreColumna)
            {
                if (!tblTabla.Columns.Contains(NombreColumna))
                    return;

                DataColumn col = tblTabla.Columns[NombreColumna];
                if (col.DataType != typeof(int) && col.DataType != typeof(double) && col.DataType != typeof(decimal))
                    return;

                string sTotal = tblTabla.Compute("SUM([" + NombreColumna + "])", "").ToString();
                double total = string.IsNullOrEmpty(sTotal) ? 0 : Convert.ToDouble(sTotal) / 2;

                string nuevaColumna = NombreColumna + " %";
                if (!tblTabla.Columns.Contains(nuevaColumna))
                {
                    tblTabla.Columns.Add(
                        nuevaColumna,
                        typeof(double),
                        total == 0 ? "0" : NombreColumna + " / " + total + " * 100"
                    );
                }
            }

            // Agregar fila de totales (solo suma columnas numéricas)
            public static void FilaTotales(ref DataTable tblTabla)
            {
                if (tblTabla.Rows.Count == 0) return;

                DataRow totalRow = tblTabla.NewRow();

                foreach (DataColumn col in tblTabla.Columns)
                {
                    if (col.DataType == typeof(int) || col.DataType == typeof(double) || col.DataType == typeof(decimal))
                    {
                        totalRow[col.ColumnName] = tblTabla.Compute("SUM([" + col.ColumnName + "])", "");
                    }
                    else
                    {
                        totalRow[col.ColumnName] = DBNull.Value;
                    }
                }

                tblTabla.Rows.Add(totalRow);
            }

            // Ordenar DataTable dinámicamente
            public static void OrdenarTabla(ref DataTable tblTabla)
            {
                if (tblTabla.Columns.Count < 2) return;

                string sSort = "";

                for (int iCol = 2; iCol < tblTabla.Columns.Count; iCol++)
                    sSort += "[" + tblTabla.Columns[iCol].ColumnName + "],";

                if (tblTabla.Columns.Contains("Cuenta"))
                    sSort += "[Cuenta]";
                else if (tblTabla.Columns.Contains("Cuentas"))
                    sSort += "[Cuentas]";
                else
                    sSort = sSort.TrimEnd(',');

                tblTabla.DefaultView.Sort = sSort;
                tblTabla = tblTabla.DefaultView.ToTable();
            }

            // Detecta automáticamente columnas numéricas y agrega % a todas
            public static void AgregarPorcentajesAutomaticos(ref DataTable tblTabla)
            {
                foreach (DataColumn col in tblTabla.Columns)
                {
                    if (col.DataType == typeof(int) || col.DataType == typeof(double) || col.DataType == typeof(decimal))
                    {
                        ColumnaPorcentaje(ref tblTabla, col.ColumnName);
                    }
                }
            }
        }

        // guardar eliminar consulta
        public async Task<string> GuardarConsulta(
            int idConsulta, string nombreConsulta, int idProducto, int idCartera,
            DataTable parametros, DataTable agrupar, DateTime desde, int idEjecutivo,
            string servidor, string tipoBase)
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