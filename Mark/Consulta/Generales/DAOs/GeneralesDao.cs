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
    public class GeneralesDao : IGeneralesDao
    {
        private readonly IDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;
        private readonly EjecutivoDao _ejecutivoDao;
        private readonly AccionamientosQueryHelper _accionamientosQueryHelper;

        public GeneralesDao(
            IDbContextFactory dbContFactory,
            DaoBase daoBase,
            EjecutivoDao ejecutivoDao,
            AccionamientosQueryHelper accionamientosQueryHelper)
        {
            _dbContFactory = dbContFactory;
            _daoBase = daoBase;
            _ejecutivoDao = ejecutivoDao;
            _accionamientosQueryHelper = accionamientosQueryHelper;
        }

        public async Task<SearchResultDto> RealizaBusqueda(
            int idProducto,
            int idCartera,
            string servidor,
            int tipoResultado,           // 1=Contar, 2=Detalle, 3=Cuentas
            int? idConsulta = null,
            IEnumerable<ParameterDto>? parametrosExtra = null,
            IEnumerable<AgruparDTO>? agruparExtra = null,
            DateTime? desdeFecha = null)
        {
            try
            {
                await ConsultaGenerador.CargarDesdeBDAsync(_dbContFactory, servidor);

                var tblParametros = CrearTablaParametros();
                var tblAgrupar = CrearTablaAgrupar();
                var fechaDesde = desdeFecha ?? DateTime.Today.AddMonths(-1);

                if (idConsulta.HasValue)
                    AplicarConsultaGuardada(idConsulta.Value, ref idProducto, ref idCartera, ref fechaDesde);
                else
                    tblParametros.Rows.Add("Cuenta", "idCartera", idCartera.ToString(), "AND", "int");

                ProcesarParametrosExtra(parametrosExtra, tblParametros);
                ProcesarAgrupacionesExtra(agruparExtra, tblAgrupar);

                var modoResultado = DeterminarModoDeResultado(tipoResultado);

                var consulta = new ConsultaGenerador(_dbContFactory);

                // CORREGIDO: Usar método para determinar concepto dinámicamente
                string conceptoPrincipal = DeterminarConceptoPrincipal(parametrosExtra, agruparExtra);

                string query = await consulta.QueryGeneral(
                    servidor,
                    idCartera,
                    conceptoPrincipal,  // ← Concepto determinado dinámicamente
                    tblParametros,
                    tblAgrupar,
                    modoResultado,
                    fechaDesde,
                    0,
                    idConsulta ?? 0);

                Console.WriteLine(query);

                string sql = $"WAITFOR DELAY '00:00:00'; USE dbCollection; SET DATEFORMAT YMD;\r\n{query}";

                var tblCuentas = await EjecutarConsultaAsync(servidor, sql);

                return new SearchResultDto
                {
                    Mensaje = "Búsqueda terminada",
                    EsError = false,
                    TotalFilasEncontradas = tblCuentas.Rows.Count,
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

        private static DataTable CrearTablaParametros()
        {
            var tabla = new DataTable();
            tabla.Columns.Add("Concepto");
            tabla.Columns.Add("Campo");
            tabla.Columns.Add("Valores");
            tabla.Columns.Add("Parámetros");
            tabla.Columns.Add("Dato");
            return tabla;
        }

        private static DataTable CrearTablaAgrupar()
        {
            var tabla = new DataTable();
            tabla.Columns.Add("Campo");
            tabla.Columns.Add("Concepto");
            return tabla;
        }

        private void AplicarConsultaGuardada(int idConsulta, ref int idProducto, ref int idCartera, ref DateTime fechaDesde)
        {
            var consultaRow = ConsultaGenerador.ObtenerConsulta(idConsulta);
            if (consultaRow == null)
                throw new Exception($"No se encontró la consulta con ID {idConsulta}");

            idProducto = Convert.ToInt32(consultaRow["idProducto"]);
            idCartera = Convert.ToInt32(consultaRow["idCartera"]);

            if (consultaRow["Desde"] != DBNull.Value)
                fechaDesde = Convert.ToDateTime(consultaRow["Desde"]);
        }

        private void ProcesarAgrupacionesExtra(IEnumerable<AgruparDTO>? agruparExtra, DataTable tblAgrupar)
        {
            if (agruparExtra == null) return;

            foreach (var a in agruparExtra)
            {
                if (!AgrupacionExiste(tblAgrupar, a.Campo, a.Concepto))
                    tblAgrupar.Rows.Add(a.Campo, a.Concepto);
            }
        }

        private static Resultado DeterminarModoDeResultado(int tipoResultado)
        {
            return tipoResultado switch
            {
                2 => Resultado.Detalle,
                3 => Resultado.Cuentas,
                _ => Resultado.Contar
            };
        }

        private async Task<DataTable> EjecutarConsultaAsync(string servidor, string sql)
        {
            DataTable tabla = new("Cuentas");

            using var connection = _dbContFactory.GetSqlConnection(servidor, "Collection");
            await connection.OpenAsync();
            using var reader = await connection.ExecuteReaderAsync(sql);
            tabla.Load(reader);

            return tabla;
        }

        private bool AgrupacionExiste(DataTable tblAgrupar, string campo, string concepto) =>
            tblAgrupar.AsEnumerable().Any(row =>
                row["Campo"].ToString() == campo &&
                row["Concepto"].ToString() == concepto);

        private void ProcesarParametrosExtra(IEnumerable<ParameterDto>? parametrosExtra, DataTable tblParametros)
        {
            if (parametrosExtra == null) return;

            foreach (var p in parametrosExtra)
            {
                Console.WriteLine($"=== PROCESANDO PARÁMETRO ===");
                Console.WriteLine($"Concepto: {p.Concepto}");
                Console.WriteLine($"Campo: {p.Campo}");
                Console.WriteLine($"Valores: {p.Valores}");
                Console.WriteLine($"Parámetros: {p.Parámetros}");
                Console.WriteLine($"Dato: {p.Dato}");

                ValidarParametro(p);

                string tipoDato = ObtenerTipoDato(p.Concepto, p.Campo, p.Dato);

                Console.WriteLine($"TipoDato determinado: {tipoDato}");

                if (EsDuplicado(tblParametros, p))
                {
                    Console.WriteLine("❌ Parámetro duplicado, omitiendo...");
                    continue;
                }

                // CORREGIDO: Usar p.Parámetros (los valores reales) en la columna "Parámetros"
                tblParametros.Rows.Add(p.Concepto, p.Campo, p.Valores, p.Parámetros, tipoDato);

                Console.WriteLine($"✅ Parámetro agregado correctamente");
                Console.WriteLine($"=== FIN PARÁMETRO ===\n");
            }

            // Debug final
            Console.WriteLine("🎯 CONTENIDO FINAL DE tblParametros:");
            if (tblParametros.Rows.Count == 0)
            {
                Console.WriteLine("   (vacío)");
            }
            else
            {
                for (int i = 0; i < tblParametros.Rows.Count; i++)
                {
                    var row = tblParametros.Rows[i];
                    Console.WriteLine($"   [{i}] Concepto: {row["Concepto"]}, Campo: {row["Campo"]}, Valores: {row["Valores"]}, Parámetros: {row["Parámetros"]}, Dato: {row["Dato"]}");
                }
            }
            Console.WriteLine("🎯 FIN CONTENIDO tblParametros\n");
        }
        private void ValidarParametro(ParameterDto p)
        {
            if (string.IsNullOrWhiteSpace(p.Concepto))
                throw new Exception("El parámetro recibido no tiene 'Concepto'.");

            if (string.IsNullOrWhiteSpace(p.Campo))
                throw new Exception($"El parámetro del concepto '{p.Concepto}' no tiene 'Campo'.");

            if (string.IsNullOrWhiteSpace(p.Valores))
                throw new Exception($"El campo '{p.Campo}' del concepto '{p.Concepto}' no contiene valores.");

            string tipoDato = ObtenerTipoDato(p.Concepto, p.Campo, p.Dato);

            var tiposPermitidos = new[] { "int", "char", "string", "list", "date" };
            if (!tiposPermitidos.Contains(tipoDato))
                throw new Exception($"El tipo de dato '{tipoDato}' del campo '{p.Campo}' no es válido.");
        }

        // CORREGIDO: Método para determinar operador correctamente
        private string ObtenerOperador(ParameterDto p)
        {
            // El operador siempre debe ser "AND" para estos parámetros
            // El problema anterior era que tomaba el valor del parámetro en lugar del operador
            return "AND";
        }

        // NUEVO MÉTODO: Determinar concepto principal dinámicamente
        private string DeterminarConceptoPrincipal(IEnumerable<ParameterDto>? parametrosExtra, IEnumerable<AgruparDTO>? agruparExtra)
        {
            // Buscar concepto en parámetros
            var conceptoParametros = parametrosExtra?.FirstOrDefault()?.Concepto;

            // Buscar concepto en agrupamientos  
            var conceptoAgrupar = agruparExtra?.FirstOrDefault()?.Concepto;

            // Priorizar: parámetros > agrupamientos > default "Cuenta"
            return conceptoParametros ?? conceptoAgrupar ?? "Cuenta";
        }

        // MÉTODO ACTUALIZADO: Manejar múltiples conceptos dinámicamente
        private string ObtenerTipoDato(string concepto, string campo, string? datoFromRequest)
        {
            if (!string.IsNullOrEmpty(datoFromRequest))
                return datoFromRequest.ToLower();

            // Manejar diferentes conceptos dinámicamente
            return concepto?.ToLower() switch
            {
                "teléfonos" => campo?.ToLower() switch
                {
                    "confirmado" or "clase" or "origen" or "telefonía" => "list",
                    "teléfono" or "número telefónico" or "númerotelefónico" => "char",
                    "extensión" or "idclase" or "idtelefonía" or "idorígen" or "confirmado" => "int",
                    _ => "string"
                },
                "cuenta" => campo?.ToLower() switch
                {
                    "situación" or "nivel" or "sucursal" or "causanopago" => "list",
                    "rfc" or "idcuenta" => "char",
                    "bloqueo" or "idcartera" => "int",
                    _ => "string"
                },
                "gestiones" or "negociaciones" or "seguimientos" or "chats" => campo?.ToLower() switch
                {
                    "fecha" or "fechacreación" or "fecha_insert" => "date",
                    "hora" or "horacreación" or "segundo_insert" => "string",
                    "duración" or "montonegociado" or "montopagado" => "int",
                    _ => "string"
                },
                "producto" => "char",
                "conteos" => "int",
                "fechas" => "date",
                _ => "string" // default para cualquier otro concepto
            };
        }

        private bool EsDuplicado(DataTable tblParametros, ParameterDto p) =>
            tblParametros.AsEnumerable().Any(r =>
                r["Concepto"].ToString() == p.Concepto &&
                r["Campo"].ToString() == p.Campo &&
                r["Valores"].ToString() == p.Valores);

        private List<Dictionary<string, object>> ConvertirTablaRespuesta(DataTable tabla)
        {
            var lista = new List<Dictionary<string, object>>();
            if (tabla == null || tabla.Rows.Count == 0) return lista;

            foreach (DataRow row in tabla.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tabla.Columns)
                {
                    object value = row[col];

                    if (col.ColumnName.Equals("Cuenta", StringComparison.OrdinalIgnoreCase) &&
                        value != DBNull.Value &&
                        value.ToString().Length > 4)
                    {
                        value = EnmascararCuenta(value.ToString());
                    }

                    dict[col.ColumnName] = value == DBNull.Value ? null : value;
                }

                lista.Add(dict);
            }

            return lista;
        }

        private string EnmascararCuenta(string cuenta) =>
            new string('X', Math.Max(0, cuenta.Length - 5)) + cuenta[^5..];
    }
}