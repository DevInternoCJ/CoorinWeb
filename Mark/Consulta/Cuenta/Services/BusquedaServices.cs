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
        private DataTable _tblParametros;

        public BusquedasService(IDbContextFactory dbContFactory, DaoBase daoBase, EjecutivoDao ejecutivoDao,
                              ExcelGeneratorService excelGeneratorService, AccionamientosQueryHelper accionamientosQueryHelper)
        {
            _dbContFactory = dbContFactory;
            _daoBase = daoBase;
            _ejecutivoDao = ejecutivoDao;
            _excelGeneratorService = excelGeneratorService;
            this._accionamientosQueryHelper = accionamientosQueryHelper;
            _tblParametros = CrearTablaParametros();
        }

        public async Task<SearchResultDto> RealizaBusqueda(
         int idProducto,
         int idCartera,
         string servidor,
         bool esDetalleResultado,
         int jerarquiaEjecutivo,
         int? idConsulta = null,
         IEnumerable<ParametroDto>? parametrosExtra = null,
         IEnumerable<AgruparDto>? agruparExtra = null,
         DateTime? desdeFecha = null)
        {
            try
            {
                var (finalIdProducto, finalIdCartera, fechaDesde) = await InicializarParametrosBusquedaAsync(
                    idProducto, idCartera, idConsulta, desdeFecha, servidor);

                var (tblParametros, tblAgrupar) = ConstruirParametrosConsulta(
                    finalIdCartera, parametrosExtra, agruparExtra, idConsulta);

                LogParametrosFinales(tblParametros, tblAgrupar);

                var resultadoQuery = await EjecutarQueryBusquedaAsync(
                    finalIdProducto, finalIdCartera, fechaDesde, tblParametros,
                    tblAgrupar, esDetalleResultado, servidor);

                var rutaExcel = await ExportarExccel(resultadoQuery);

                var datosProcesados = ProcesarDatosResultado(resultadoQuery, jerarquiaEjecutivo, finalIdCartera);

                return ResultadoOk(datosProcesados, resultadoQuery.Rows.Count, rutaExcel);
            }
            catch (Exception ex)
            {
                LogErrorBusqueda(ex);
                return ResultadoError(ex.Message);
            }
        }

        public string AgregaParametros(string sConcepto, string sCampo, string sSimbolo, string sValor, string sId)
        {
            int iNumero;
            DateTime dtFecha = new DateTime();
            string sSignos = sSimbolo,
                   sDato = "int";
            DataRow drFila;

            sValor = sValor.Replace("'", "");

            // Símbolo
            if (sSimbolo == "≤")
                sSignos = "<=";
            else if (sSimbolo == "≥")
                sSignos = ">=";

            // Fila
            drFila = _tblParametros.Rows.Cast<DataRow>()
                .FirstOrDefault(row => row["Concepto"].ToString() == sConcepto && row["Campo"].ToString() == sCampo);

            if (drFila == null)
                drFila = _tblParametros.Rows.Add(sConcepto, sCampo, "", "", sDato);
            else
            {
                if (drFila["Parámetros"].ToString().Contains(">") && (sSignos == "=" || sSignos.StartsWith(">")))
                    return "Solo puede asignar una desigualdad en el otro sentido <.";

                if (drFila["Parámetros"].ToString().Contains("<") && (sSignos == "=" || sSignos.StartsWith("<")))
                    return "Solo puede asignar una desigualdad en el otro sentido >.";

                if (drFila["Valores"].ToString().Contains("≠") && sSimbolo != "≠")
                    return "Ya tiene un signo ≠, solo puede agregar más parámetros de ≠ .";

                if (drFila["Valores"].ToString().Contains("=") && sSimbolo != "=")
                    return "Ya tiene un signo =, solo puede agregar más parámetros de = .";
            }

            // Concepto
            switch (sConcepto)
            {
                case "Cuenta":
                    if (sCampo == "RFC")
                    {
                        sDato = "char";
                        if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(sSimbolo + "\"" + sValor.ToLower() + "\""))
                            return "Ya estableció dicho parámetro.";

                        drFila.ItemArray = new object[] {
                            sConcepto, sCampo,
                            drFila["Valores"] + ", " + sSimbolo + "\"" + sValor + "\"",
                            drFila["Parámetros"] + ", " + sSignos + sValor,
                            sDato
                        };
                    }
                    else
                    {
                        if (drFila["Parámetros"].ToString().Contains(sId))
                            return "Ya estableció dicho parámetro.";
                        drFila.ItemArray = new object[] {
                            sConcepto, sCampo,
                            drFila["Valores"] + ", " + sValor,
                            drFila["Parámetros"] + "," + sId,
                            "list"
                        };
                    }
                    break;

                case "Producto":
                    sDato = "char";

                    if (drFila["Dato"].ToString() == "int" && !int.TryParse(sValor, out iNumero))
                        return "Debe comparar números con números.";

                    if (drFila["Dato"].ToString() == "date" && !DateTime.TryParse(sValor, out dtFecha))
                        return "Debe comparar fechas con fechas.";

                    if (sSignos.Contains(">") || sSignos.Contains("<"))
                    {
                        if (!int.TryParse(sValor, out iNumero) && !DateTime.TryParse(sValor, out dtFecha))
                            return "Para hacer comparaciones escriba una cantidad o una fecha.";

                        if (sValor.Contains("/") || sValor.Contains("-"))
                        {
                            sValor = dtFecha.ToString("yyyy-MM-dd");
                            sDato = "date";
                        }
                        else
                            sDato = "int";
                    }

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(sSimbolo + "\"" + sValor.ToLower() + "\""))
                        return "Ya estableció dicho parámetro.";

                    drFila.ItemArray = new object[] {
                        sConcepto, sCampo,
                        drFila["Valores"] + ", " + sSimbolo + (sDato == "char" ? "\"" + sValor + "\"" : sValor),
                        drFila["Parámetros"] + ", " + sSignos + (sDato == "date" ? "'" + sValor + "'" : sValor),
                        sDato
                    };
                    break;

                case "Conteos":
                    if (!int.TryParse(sValor, out iNumero))
                        return "Indique una cantidad de números enteros.";

                    if (drFila["Valores"].ToString().Contains(sSimbolo + sValor))
                        return "Ya estableció dicho parámetro.";

                    drFila.ItemArray = new object[] {
                        sConcepto, sCampo,
                        drFila["Valores"] + ", " + sSimbolo + sValor,
                        drFila["Parámetros"] + ", " + sSignos + iNumero,
                        sDato
                    };
                    break;

                case "Fechas":
                    if (!DateTime.TryParse(sValor, out dtFecha))
                        return "Debe escribir una fecha válida.";

                    sValor = dtFecha.ToString("yyyy-MM-dd");

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(sSimbolo + sValor.ToLower()))
                        return "Ya estableció dicho parámetro.";

                    drFila.ItemArray = new object[] {
                        sConcepto, sCampo,
                        drFila["Valores"] + ", " + sSimbolo + sValor,
                        drFila["Parámetros"] + ", " + sSignos + "'" + sValor + "'",
                        "date"
                    };
                    break;

                default:
                    return "";
            }

            // Limpiar valores
            if (drFila["Dato"].ToString() == "list" && drFila["Valores"].ToString().StartsWith(","))
                drFila["Valores"] = sSimbolo + " " + drFila["Valores"].ToString().TrimStart(new char[] { ',', ' ' });

            drFila["Valores"] = drFila["Valores"].ToString().TrimStart(new char[] { ',', ' ' });
            drFila["Parámetros"] = drFila["Parámetros"].ToString().TrimStart(new char[] { ',', ' ' });

            return "";
        }

        private async Task<(int IdProducto, int IdCartera, DateTime FechaDesde)> InicializarParametrosBusquedaAsync(
            int idProducto, int idCartera, int? idConsulta, DateTime? desdeFecha, string servidor)
        {
            DateTime fechaDesde = desdeFecha ?? DateTime.Today.AddMonths(-1);

            if (idConsulta.HasValue)
            {
                var datosConsulta = await ObtenerDatosConsultaAsync(idConsulta.Value, servidor);
                return (datosConsulta.IdProducto, datosConsulta.IdCartera, desdeFecha ?? datosConsulta.Desde);
            }

            return (idProducto, idCartera, fechaDesde);
        }

        private async Task<ConsultaData> ObtenerDatosConsultaAsync(int idConsulta, string servidor)
        {
            await ConsultaGenerador.CargarDesdeBDAsync(_dbContFactory, servidor);
            var consultaRow = ConsultaGenerador.ObtenerConsulta(idConsulta);

            if (consultaRow == null)
                throw new Exception($"No se encontró la consulta con ID {idConsulta}");

            return new ConsultaData(
                Convert.ToInt32(consultaRow["idProducto"]),
                Convert.ToInt32(consultaRow["idCartera"]),
                Convert.ToDateTime(consultaRow["Desde"])
            );
        }

        private (DataTable Parametros, DataTable Agrupar) ConstruirParametrosConsulta(
            int idCartera, IEnumerable<ParametroDto>? parametrosExtra, IEnumerable<AgruparDto>? agruparExtra, int? idConsulta)
        {
            var tblParametros = CrearTablaParametros();
            var tblAgrupar = CrearTablaAgrupar();

            // Solo agregar parámetro básico de cartera cuando no hay idConsulta
            if (!idConsulta.HasValue)
            {
                tblParametros.Rows.Add("idCartera", "=", idCartera.ToString(), "AND", "int");
            }

            ProcesarParametrosExtra(parametrosExtra, tblParametros);
            ProcesarAgruparExtra(agruparExtra, tblAgrupar);

            return (tblParametros, tblAgrupar);
        }

        private DataTable CrearTablaParametros()
        {
            var tabla = new DataTable();
            tabla.Columns.Add("Concepto", typeof(string));
            tabla.Columns.Add("Campo", typeof(string));
            tabla.Columns.Add("Valores", typeof(string));
            tabla.Columns.Add("Parámetros", typeof(string));
            tabla.Columns.Add("Dato", typeof(string));
            return tabla;
        }

        private DataTable CrearTablaAgrupar()
        {
            var tabla = new DataTable();
            tabla.Columns.Add("Campo", typeof(string));
            tabla.Columns.Add("Concepto", typeof(string));
            return tabla;
        }

        private void ProcesarParametrosExtra(IEnumerable<ParametroDto>? parametrosExtra, DataTable tblParametros)
        {
            if (parametrosExtra == null || !parametrosExtra.Any())
                return;

            foreach (var parametro in parametrosExtra)
            {
                string tipoDato = DeterminarTipoDato(parametro.Concepto, parametro.Campo, parametro.Dato);
                string valoresProcesados = LimpiarValoresParametro(
                    parametro.Valores ?? "", tipoDato, parametro.Concepto, parametro.Campo);

                tblParametros.Rows.Add(
                    parametro.Concepto,
                    parametro.Campo,
                    valoresProcesados,
                    parametro.Parámetros ?? "AND",
                    tipoDato
                );

                Console.WriteLine($"Parámetro cargado: {parametro.Concepto}, {parametro.Campo}, {valoresProcesados}, {tipoDato}");
            }
        }

        private void ProcesarAgruparExtra(IEnumerable<AgruparDto>? agruparExtra, DataTable tblAgrupar)
        {
            if (agruparExtra == null || !agruparExtra.Any())
                return;

            foreach (var agrupar in agruparExtra)
            {
                if (!AgrupacionExiste(tblAgrupar, agrupar.Campo, agrupar.Concepto))
                {
                    tblAgrupar.Rows.Add(agrupar.Campo, agrupar.Concepto);
                }
                else
                {
                    // Agrupación duplicada - no hacer nada
                }
            }
        }

        private async Task<DataTable> EjecutarQueryBusquedaAsync(
            int idProducto, int idCartera, DateTime fechaDesde, DataTable parametros,
            DataTable agrupar, bool esDetalleResultado, string servidor)
        {
            await ConsultaGenerador.CargarDesdeBDAsync(_dbContFactory, servidor);

            ArrayList listaColumnas = new ArrayList();
            var conteo = esDetalleResultado ? Resultado.Detalle : Resultado.Contar;

            var queryData = ConsultaGenerador.GeneraQueryCuentas(
                idProducto, parametros, agrupar, conteo, fechaDesde, idCartera, ref listaColumnas);

            string queryFinal = $"WAITFOR DELAY '00:00:00'; USE dbCollection; SET DATEFORMAT YMD;\r\n{queryData.Query}";
            Console.WriteLine(" Query generado \n" + queryFinal);

            return await EjecutarQueryAsync(queryFinal, servidor);
        }

        private async Task<DataTable> EjecutarQueryAsync(string query, string servidor)
        {
            var tablaResultados = new DataTable("Cuentas");

            using (var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection"))
            {
                await sqlConnection.OpenAsync();
                using (var reader = await sqlConnection.ExecuteReaderAsync(query))
                {
                    tablaResultados.Load(reader);
                }
            }

            return tablaResultados;
        }

        private async Task<string?> ExportarExccel(DataTable datos)
        {
            if (datos.Rows.Count == 0)
            {
                Console.WriteLine(" No hay resultados para exportar a Excel ");
                return null;
            }

            try
            {
                string nombreArchivo = $"Cuentas_{Guid.NewGuid():N}.xlsx";
                string carpetaUploads = Path.Combine(Directory.GetCurrentDirectory(), "ExcelExports");
                Directory.CreateDirectory(carpetaUploads);
                string rutaArchivo = Path.Combine(carpetaUploads, nombreArchivo);

                string resultado = _excelGeneratorService.ExportToExcelSAX(ref datos, rutaArchivo);

                if (!string.IsNullOrEmpty(resultado))
                {
                    return null;
                }

                string rutaExcel = $"/api/busquedas/download-excel?filename={nombreArchivo}";

                return rutaExcel;
            }
            catch (UnauthorizedAccessException)
            {
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<Dictionary<string, object>> ProcesarDatosResultado(
            DataTable tablaDatos, int jerarquiaEjecutivo, int idCartera)
        {
            var datosResultado = new List<Dictionary<string, object>>();

            foreach (DataRow fila in tablaDatos.Rows)
            {
                var item = new Dictionary<string, object>();

                foreach (DataColumn columna in tablaDatos.Columns)
                {
                    object valor = fila[columna];

                    if (EsColumnaCuenta(columna.ColumnName) && valor != null && valor != DBNull.Value)
                    {
                        valor = EnmascararNumeroCuenta(valor.ToString()!, jerarquiaEjecutivo, idCartera);
                    }

                    item[columna.ColumnName] = valor;
                }

                datosResultado.Add(item);
            }

            return datosResultado;
        }

        private string EnmascararNumeroCuenta(string cuenta, int jerarquiaEjecutivo, int idCartera)
        {
            if (jerarquiaEjecutivo >= 3)
                return cuenta;

            if (idCartera == 1)
            {
                // STUFF(STUFF(C.idCuenta,1,2,'XX'),13, 2,'XX') [Cuenta]
                if (cuenta.Length >= 14)
                {
                    char[] arr = cuenta.ToCharArray();
                    arr[0] = 'X';
                    arr[1] = 'X';
                    arr[12] = 'X';
                    arr[13] = 'X';
                    return new string(arr);
                }
            }
            else
            {
                // STUFF(C.idCuenta,1,LEN(C.idCuenta)-4,'XXX-XXX-')
                if (cuenta.Length > 4)
                {
                    int ocultar = cuenta.Length - 4;
                    return new string('X', ocultar) + cuenta.Substring(cuenta.Length - 4);
                }
            }

            return cuenta;
        }

        private SearchResultDto ResultadoOk(
            List<Dictionary<string, object>> datos, int totalFilas, string? rutaExcel)
        {
            return new SearchResultDto
            {
                Mensaje = "Búsqueda terminada.",
                EsError = false,
                TotalFilasEncontradas = totalFilas,
                Datos = datos,
                RutaDescargaExcel = rutaExcel
            };
        }

        private SearchResultDto ResultadoError(string mensajeError)
        {
            return new SearchResultDto
            {
                Mensaje = $"Error al realizar la búsqueda: {mensajeError}",
                EsError = true
            };
        }

        private void LogParametrosFinales(DataTable parametros, DataTable agrupar)
        {
            foreach (DataRow row in parametros.Rows)
            {
                Console.WriteLine($"Concepto: {row["Concepto"]}, Campo: {row["Campo"]}, Valores: {row["Valores"]}, Parámetros: {row["Parámetros"]}, Dato: {row["Dato"]}");
            }

            foreach (DataRow row in agrupar.Rows)
            {
                Console.WriteLine($"Campo: {row["Campo"]}, Concepto: {row["Concepto"]}");
            }
        }

        private void LogErrorBusqueda(Exception ex)
        {
            Console.WriteLine($"=== ERROR: {ex.Message}");
            Console.WriteLine($"=== STACK TRACE: {ex.StackTrace}");

            if (ex.Message.Contains("Incorrect syntax"))
            {
                Console.WriteLine(" ERROR DE SINTAXIS SQL DETECTADO ");
            }
        }

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

        private string DeterminarTipoDato(string concepto, string campo, string datoFromRequest)
        {
            if (!string.IsNullOrEmpty(datoFromRequest))
                return datoFromRequest.ToLower();

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
                var match = Regex.Match(valoresLimpios, @"\d+");
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
                if (!valoresLimpios.Contains("'") && Regex.IsMatch(valoresLimpios, @"\d"))
                {
                    var match = Regex.Match(valoresLimpios, @"([<>]=?|=|<>)\s*(\d{4}-\d{2}-\d{2})");
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

            return valoresLimpios;
        }

        private bool EsColumnaCuenta(string nombreColumna)
        {
            return nombreColumna.Equals("Cuenta", StringComparison.OrdinalIgnoreCase);
        }

        //  Clase interna para datos de consulta 
        private record ConsultaData(int IdProducto, int IdCartera, DateTime Desde);

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