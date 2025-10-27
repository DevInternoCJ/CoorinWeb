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
         IEnumerable<AgruparDto>? agruparExtra = null,
         DateTime? desdeFecha = null)  // Nuevo parámetro para la fecha desde
        {
            try
            {
                Console.WriteLine("🚨🚨🚨 INICIO REALIZABUSQUEDA 🚨🚨🚨");
                Console.WriteLine($"idConsulta recibido: {idConsulta}");
                Console.WriteLine($"desdeFecha recibido: {desdeFecha}");

                // === Cargar consultas desde BD (solo para obtener datos básicos) ===
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

                // === USAR LA FECHA DEL REQUEST O POR DEFECTO ===
                DateTime fechaDesde = desdeFecha ?? DateTime.Today.AddMonths(-1);
                Console.WriteLine($"=== Usando fecha desde: {fechaDesde:yyyy-MM-dd}");

                // === Si hay idConsulta, obtener solo datos básicos (no parámetros/agrupaciones) ===
                if (idConsulta.HasValue)
                {
                    Console.WriteLine($"=== PROCESANDO idConsulta: {idConsulta.Value} ===");

                    var consultaRow = ConsultaGenerador.ObtenerConsulta(idConsulta.Value);
                    if (consultaRow == null)
                        throw new Exception($"No se encontró la consulta con ID {idConsulta.Value}");

                    // Solo obtener datos básicos de la consulta
                    idProducto = Convert.ToInt32(consultaRow["idProducto"]);
                    idCartera = Convert.ToInt32(consultaRow["idCartera"]);

                    // Usar la fecha de la consulta solo si no se proporcionó desdeFecha
                    if (!desdeFecha.HasValue)
                    {
                        fechaDesde = Convert.ToDateTime(consultaRow["Desde"]);
                    }

                    Console.WriteLine($"=== Valores actualizados: Producto={idProducto}, Cartera={idCartera}, Desde={fechaDesde:yyyy-MM-dd}");

                    // NO cargar parámetros ni agrupaciones desde BD - usar solo los del JSON
                    Console.WriteLine("=== Usando parámetros y agrupaciones del JSON en lugar de BD ===");
                }
                else
                {
                    Console.WriteLine("=== NO hay idConsulta, usando parámetros por defecto ===");
                    // Parámetro básico de cartera cuando no hay idConsulta
                    tblParametros.Rows.Add("idCartera", "=", idCartera.ToString(), "AND", "int");
                }

                // === Procesar parámetros del JSON (tanto si hay idConsulta como si no) ===
                ProcesarParametrosExtra(parametrosExtra, tblParametros);

                // === AGREGAR AGRUPACIONES EXTRA DESDE EL NUEVO PARÁMETRO ===
                if (agruparExtra != null && agruparExtra.Any())
                {
                    foreach (var agrupar in agruparExtra)
                    {
                        if (!AgrupacionExiste(tblAgrupar, agrupar.Campo, agrupar.Concepto))
                        {
                            tblAgrupar.Rows.Add(agrupar.Campo, agrupar.Concepto);
                            Console.WriteLine($"✅ Agrupación extra cargada: {agrupar.Campo}, {agrupar.Concepto}");
                        }
                        else
                        {
                            Console.WriteLine($"⚠️ Agrupación duplicada omitida: {agrupar.Campo}, {agrupar.Concepto}");
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
                    fechaDesde,  // Usar la fecha calculada
                    idCartera,
                    ref listaColumnas
                );

                string sQuery = "WAITFOR DELAY '00:00:00'; USE dbCollection; SET DATEFORMAT YMD;\r\n" + queryData.Query;

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

                Console.WriteLine($"=== Query ejecutado correctamente. Filas obtenidas: {tblCuentas.Rows.Count}");

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
                    Console.WriteLine($"=== Excel generado: {rutaExcel}");
                }
                else
                {
                    Console.WriteLine("=== No hay resultados para exportar a Excel ===");
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

                Console.WriteLine("=== Búsqueda terminada exitosamente ===");

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

                // Log más detallado para errores de SQL
                if (ex.Message.Contains("Incorrect syntax"))
                {
                    Console.WriteLine("=== ERROR DE SINTAXIS SQL DETECTADO ===");
                }

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

        private void ProcesarParametrosExtra(IEnumerable<ParametroDto> parametrosExtra, DataTable tblParametros)
        {
            if (parametrosExtra == null || !parametrosExtra.Any())
                return;

            foreach (var p in parametrosExtra)
            {
                string valoresProcesados = p.Valores ?? "";

                // Determinar automáticamente el tipo de dato
                string tipoDato = DeterminarTipoDato(p.Concepto, p.Campo, p.Dato);

                // Limpiar y formatear valores según el tipo de dato
                valoresProcesados = LimpiarValoresParametro(valoresProcesados, tipoDato, p.Concepto, p.Campo);

                // Valores por defecto para parámetros opcionales
                string parametrosValue = p.Parámetros ?? "AND";
                string datoValue = tipoDato;

                tblParametros.Rows.Add(p.Concepto, p.Campo, valoresProcesados, parametrosValue, datoValue);
                Console.WriteLine($"✅ Parámetro cargado: {p.Concepto}, {p.Campo}, {valoresProcesados}, {datoValue}");
            }
        }

        private string LimpiarValoresParametro(string valores, string tipoDato, string concepto, string campo)
        {
            if (string.IsNullOrEmpty(valores))
                return valores;

            string valoresLimpios = valores.Trim();

            // Para campos de lista (como situación), extraer solo el ID
            if (tipoDato?.ToLower() == "list" && concepto?.ToLower() == "cuenta" && campo?.ToLower() == "situación")
            {
                if (valoresLimpios.Contains("Sondeo") || valoresLimpios.Contains("1042"))
                {
                    return "1042";
                }
                // Extraer solo números si hay texto
                var match = System.Text.RegularExpressions.Regex.Match(valoresLimpios, @"\d+");
                if (match.Success)
                {
                    return match.Value;
                }
            }

            // Para fechas, asegurar formato correcto
            if (tipoDato?.ToLower() == "date")
            {
                // Reemplazar caracteres problemáticos
                valoresLimpios = valoresLimpios.Replace("≠", "<>").Replace("?", "<>");

                // Agregar comillas simples si es necesario
                if (!valoresLimpios.Contains("'") && System.Text.RegularExpressions.Regex.IsMatch(valoresLimpios, @"\d"))
                {
                    var match = System.Text.RegularExpressions.Regex.Match(valoresLimpios, @"([<>]=?|=|<>)\s*(\d{4}-\d{2}-\d{2})");
                    if (match.Success)
                    {
                        valoresLimpios = $"{match.Groups[1].Value} '{match.Groups[2].Value}'";
                    }
                }

                // Limpiar comillas dobles
                valoresLimpios = valoresLimpios.Replace("''", "'");
            }

            // Para conteos, asegurar formato correcto
            if (tipoDato?.ToLower() == "int")
            {
                valoresLimpios = valoresLimpios.Replace("≠", "<>");
            }

            // Para campos char/texto, asegurar formato correcto si es una lista
            if (tipoDato?.ToLower() == "char" && valoresLimpios.Contains(","))
            {
                if (!valoresLimpios.Contains("'"))
                {
                    var valoresArray = valoresLimpios.Split(',');
                    var valoresConComillas = string.Join(", ", valoresArray.Select(v => $"'{v.Trim().Replace("=", "").Replace("≠", "")}'"));
                    valoresLimpios = valoresConComillas;
                }
            }

            Console.WriteLine($"🔧 Valores transformados: {valores} -> {valoresLimpios}");
            return valoresLimpios;
        }

        private string DeterminarTipoDato(string concepto, string campo, string datoFromRequest)
        {
            // Si viene en el request, usarlo
            if (!string.IsNullOrEmpty(datoFromRequest))
                return datoFromRequest.ToLower();

            // Determinar automáticamente basado en concepto y campo
            switch (concepto?.ToLower())
            {
                case "cuenta":
                    if (campo?.ToLower() == "situación" || campo?.ToLower() == "nivel" ||
                        campo?.ToLower() == "sucursal" || campo?.ToLower() == "causanopago")
                        return "list";
                    else if (campo?.ToLower() == "rfc")
                        return "char";
                    else if (campo?.ToLower() == "bloqueo")
                        return "int";
                    break;

                case "producto":
                    return "char";

                case "conteos":
                    return "int";

                case "fechas":
                    return "date";
            }

            return "string";
        }
        // === Método auxiliar para verificar duplicados ===
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