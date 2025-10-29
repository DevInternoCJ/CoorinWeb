using CoorinWeb.Loki.Common;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.GeneralesDTOs;
using Loki.Global;
using Loki.Mark.Consulta.Generales.Interfaces;
using System.Collections;
using System.Data;
using static CoorinWeb.Loki.Global.AccionamientosQueryHelper;

namespace Loki.Mark.Consulta.Generales.DAOs
{
    public class GeneralesDao:IGeneralesDao
    {
        private readonly IDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;
        private readonly EjecutivoDao _ejecutivoDao;
        private readonly ExcelGeneratorService _excelGeneratorService;
        private readonly AccionamientosQueryHelper _accionamientosQueryHelper;

        public GeneralesDao(IDbContextFactory dbContFactory, DaoBase daoBase, EjecutivoDao ejecutivoDao,
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
            int tipoResultado, // 1=Contar, 2=Detalle, 3=Cuentas
            int? idConsulta = null,
            IEnumerable<ParameterDto>? parametrosExtra = null,
            IEnumerable<AgruparDTO>? agruparExtra = null,
            DateTime? desdeFecha = null)
        {
            try
            {
                // 1️⃣ Cargar config de la base
                await ConsultaGenerador.CargarDesdeBDAsync(_dbContFactory, servidor);

                DataTable tblParametros = new();
                tblParametros.Columns.Add("Concepto");
                tblParametros.Columns.Add("Campo");
                tblParametros.Columns.Add("Valores");
                tblParametros.Columns.Add("Parámetros");
                tblParametros.Columns.Add("Dato");

                DataTable tblAgrupar = new();
                tblAgrupar.Columns.Add("Campo");
                tblAgrupar.Columns.Add("Concepto");

                DateTime fechaDesde = desdeFecha ?? DateTime.Today.AddMonths(-1);

                // 2️⃣ Si viene ID consulta, cargar variables de la BD
                if (idConsulta.HasValue)
                {
                    var consultaRow = ConsultaGenerador.ObtenerConsulta(idConsulta.Value);
                    if (consultaRow == null)
                        throw new Exception($"No se encontró la consulta con ID {idConsulta}");

                    idProducto = Convert.ToInt32(consultaRow["idProducto"]);
                    idCartera = Convert.ToInt32(consultaRow["idCartera"]);

                    if (!desdeFecha.HasValue)
                        fechaDesde = Convert.ToDateTime(consultaRow["Desde"]);
                }
                else
                {
                    tblParametros.Rows.Add("idCartera", "=", idCartera.ToString(), "AND", "int");
                }

                ProcesarParametrosExtra(parametrosExtra, tblParametros);

                if (agruparExtra != null)
                    foreach (var a in agruparExtra)
                        if (!AgrupacionExiste(tblAgrupar, a.Campo, a.Concepto))
                            tblAgrupar.Rows.Add(a.Campo, a.Concepto);

                // 3️⃣ Determinar resultado
                Resultado conteo = Resultado.Contar;
                if (tipoResultado == 2) conteo = Resultado.Detalle;
                if (tipoResultado == 3) conteo = Resultado.Cuentas;

                var consulta = new ConsultaGenerador(_dbContFactory);

                string query = await consulta.QueryGeneral(
                    servidor,
                    idCartera,
                    "Cuenta",              // CONCEPTO DEFAULT; puedes cambiar según necesites
                    tblParametros,
                    tblAgrupar,
                    conteo,
                    fechaDesde,
                    0,                     // idEjecutivo por defecto
                    idConsulta ?? 0
                );

                string sql = "WAITFOR DELAY '00:00:00'; USE dbCollection; SET DATEFORMAT YMD;\r\n" + query;

                // 4️⃣ Ejecutar query
                DataTable tblCuentas = new("Cuentas");
                using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection");
                await sqlConnection.OpenAsync();
                using var reader = await sqlConnection.ExecuteReaderAsync(sql);
                tblCuentas.Load(reader);

                // 5️⃣ Si trajo cuentas → exportar
                string rutaExcel = null;
                if (tblCuentas.Rows.Count > 0 && tipoResultado != 1) // solo si no es contar
                {
                    string fileName = $"Cuentas_{Guid.NewGuid():N}.xlsx";
                    string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "ExcelExports");
                    Directory.CreateDirectory(uploadsFolder);
                    string filePath = Path.Combine(uploadsFolder, fileName);

                    string resultado = _excelGeneratorService.ExportToExcelSAX(ref tblCuentas, filePath);
                    if (string.IsNullOrEmpty(resultado))
                        rutaExcel = $"/api/busquedas/download-excel?filename={fileName}";
                }

                return new SearchResultDto
                {
                    Mensaje = "Búsqueda terminada",
                    EsError = false,
                    TotalFilasEncontradas = tblCuentas.Rows.Count,
                    RutaDescargaExcel = rutaExcel,
                    Datos = ConvertirTablaRespuesta(tblCuentas)
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


        //  Método auxiliar para verificar duplicados 
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

        private void ProcesarParametrosExtra(IEnumerable<ParameterDto> parametrosExtra, DataTable tblParametros)
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
                Console.WriteLine($"Parámetro cargado: {p.Concepto}, {p.Campo}, {valoresProcesados}, {datoValue}");
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

        // --- helper para convertir DataTable a List<Dictionary<string, object>> ---
        private List<Dictionary<string, object>> ConvertirTablaRespuesta(DataTable tabla)
        {
            var lista = new List<Dictionary<string, object>>();

            if (tabla == null || tabla.Rows.Count == 0)
                return lista;

            foreach (DataRow row in tabla.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tabla.Columns)
                {
                    var value = row[col];
                    // Enmascarar cuenta si existe la columna 'Cuenta'
                    if (col.ColumnName.Equals("Cuenta", StringComparison.OrdinalIgnoreCase) && value != DBNull.Value)
                    {
                        string cuenta = value.ToString();
                        if (!string.IsNullOrEmpty(cuenta) && cuenta.Length > 4)
                        {
                            value = new string('X', Math.Max(0, cuenta.Length - 5)) + cuenta.Substring(cuenta.Length - 5);
                        }
                    }
                    dict[col.ColumnName] = value == DBNull.Value ? null : value;
                }
                lista.Add(dict);
            }

            return lista;
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
    }
}
