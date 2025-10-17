using System.Data;
using Microsoft.Data.SqlClient;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Loki.Mark.Consulta.Generales.Interfaces;
using static Loki.Mark.Consulta.Cuenta.Services.BusquedasService;
using static CoorinWeb.Loki.Global.AccionamientosQueryHelper;
using CoorinWeb.Loki.Common;
using Loki.Mark.Consulta.Informacion.Busquedas.Interfaces;
using Loki.Global;
using Loki.Mark.Consulta.Cuenta.Interfaces;

namespace Loki.Mark.Consulta.Generales.DAOs
{
    public class GeneralesDao : IGeneralesDao
    {
        private readonly IDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;
        private readonly IBusquedasService _busquedasService;
        private readonly ICatalogosServiceRe _catalogosServiceRe;
        private readonly ExcelGeneratorService _excelGeneratorService;

        // Tablas de parámetros y agrupamiento
        private readonly DataTable _tblParametros;
        private readonly DataTable _tblAgrupar;

        public GeneralesDao(
            IDbContextFactory dbContFactory,
            DaoBase daoBase,
            IBusquedasService busquedasService,
            ICatalogosServiceRe catalogosServiceRe,
            ExcelGeneratorService excelGeneratorService)
        {
            _dbContFactory = dbContFactory;
            _daoBase = daoBase;
            _busquedasService = busquedasService;
            _catalogosServiceRe = catalogosServiceRe;
            _excelGeneratorService = excelGeneratorService;

            // Inicialización de DataTables
            _tblParametros = new DataTable("Parametros");
            _tblParametros.Columns.Add("Concepto", typeof(string));
            _tblParametros.Columns.Add("Campo", typeof(string));
            _tblParametros.PrimaryKey = new DataColumn[]
            {
                _tblParametros.Columns["Concepto"],
                _tblParametros.Columns["Campo"]
            };

            _tblAgrupar = new DataTable("Agrupar");
            _tblAgrupar.Columns.Add("Concepto", typeof(string));
            _tblAgrupar.Columns.Add("Campo", typeof(string));
            _tblAgrupar.PrimaryKey = new DataColumn[]
            {
                _tblAgrupar.Columns["Concepto"],
                _tblAgrupar.Columns["Campo"]
            };
        }

        // ===================== PARAMETROS =====================
        public DataTable ObtenerParametros() => _tblParametros.Copy();
        public DataTable ObtenerAgrupamientos() => _tblAgrupar.Copy();

        public string AgregarParametro(string concepto, string campo)
        {
            if (string.IsNullOrWhiteSpace(concepto) || string.IsNullOrWhiteSpace(campo))
                return "Concepto o campo inválido.";

            var filaExistente = _tblParametros.Rows.Find(new object[] { concepto, campo });
            if (filaExistente != null)
                _tblParametros.Rows.Remove(filaExistente);

            var dr = _tblParametros.NewRow();
            dr["Concepto"] = concepto;
            dr["Campo"] = campo;
            _tblParametros.Rows.Add(dr);

            return string.Empty;
        }

        public string AgregarAgrupamiento(string concepto, string campo)
        {
            if (string.IsNullOrWhiteSpace(concepto) || string.IsNullOrWhiteSpace(campo))
                return "Concepto o campo inválido.";

            var filaExistente = _tblAgrupar.Rows.Find(new object[] { concepto, campo });
            if (filaExistente != null)
                return "Ya dio de alta dicho parámetro.";

            _tblAgrupar.Rows.Add(concepto, campo);
            return string.Empty;
        }

        public bool EliminarAgrupamiento(string concepto, string campo)
        {
            var fila = _tblAgrupar.Rows.Find(new object[] { concepto, campo });
            if (fila != null)
            {
                _tblAgrupar.Rows.Remove(fila);
                return true;
            }

            return false;
        }

        // ===================== BÚSQUEDA =====================
        public async Task<(bool ok, string mensaje, DataTable? tabla, string? rutaExcel)>
            RealizaBusquedaAsync(string servidor, string tipoBase, string query, bool detalle = false, bool exportarExcel = false)
        {
            var tblCuentas = new DataTable("ConsultaCuentas");
            string? rutaExcel = null;

            try
            {
                using var conn = _dbContFactory.GetSqlConnection(servidor, tipoBase);
                using var cmd = new SqlCommand($"USE dbCollection; SET DATEFORMAT YMD; {query}", conn);
                await conn.OpenAsync();

                using var da = new SqlDataAdapter(cmd);
                da.Fill(tblCuentas);

                if (tblCuentas.Rows.Count == 0)
                    return (false, "No se encontraron registros.", null, null);

                if (detalle && exportarExcel)
                {
                    rutaExcel = Path.Combine(Path.GetTempPath(), $"Consulta_{DateTime.Now:yyyyMMdd_HHmmss}.xlsx");
                    string? resultadoExcel = _excelGeneratorService.ExportToExcelSAX(ref tblCuentas, rutaExcel);
                    if (!string.IsNullOrEmpty(resultadoExcel))
                        return (false, $"Error al exportar Excel: {resultadoExcel}", null, null);
                }
                else
                {
                    Funciones.ColumnaPorcentaje(ref tblCuentas, tblCuentas.Columns[0].ColumnName);
                    Funciones.FilaTotales(ref tblCuentas);
                }

                return (true, "Consulta terminada.", tblCuentas, rutaExcel);
            }
            catch (Exception ex)
            {
                return (false, $"Error durante la búsqueda: {ex.Message}", null, null);
            }
        }

        // ===================== CONSULTAR =====================
       

    }
}
