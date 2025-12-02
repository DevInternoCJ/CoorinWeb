using CoorinWeb.Loki.Common;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.GeneralesDTOs;
using Loki.Global;
using Loki.Mark.Consulta.Generales.Interfaces;
using System.Collections;
using System.Data;
using System.Text.RegularExpressions;
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
            int tipoResultado,
            int jerarquia,
            int? idConsulta = null,
            IEnumerable<ParameterDto>? parametrosExtra = null,
            IEnumerable<AgruparDTO>? agruparExtra = null,
            DateTime? desdeFecha = null)
        {
            try
            {
                await ConsultaGenerador.CargarDesdeBDAsync(_dbContFactory, servidor);

                var (tblParametros, tblAgrupar, fechaDesde) = InicializarTablas(idCartera, idConsulta, desdeFecha);

                // Validar y procesar parámetros
                var errorValidacion = ProcesarYValidarParametros(parametrosExtra, tblParametros);
                if (!string.IsNullOrEmpty(errorValidacion))
                    return CrearResultadoError($"Error en validación de parámetros: {errorValidacion}");

                ProcesarAgrupacionesExtra(agruparExtra, tblAgrupar);

                var modoResultado = DeterminarModoDeResultado(tipoResultado);
                var conceptoPrincipal = DeterminarConceptoPrincipal(parametrosExtra, agruparExtra);

                // Construir y ejecutar query
                var query = await ConstruirQueryConEnmascaramiento(
                    servidor, idCartera, conceptoPrincipal, tblParametros, tblAgrupar,
                    modoResultado, fechaDesde, idConsulta, jerarquia);

                var tblCuentas = await EjecutarConsultaAsync(servidor, query);

                return new SearchResultDto
                {
                    Mensaje = "Búsqueda terminada",
                    EsError = false,
                    TotalFilasEncontradas = tblCuentas.Rows.Count,
                    Datos = ConvertirTablaRespuesta(tblCuentas, idCartera, jerarquia)
                };
            }
            catch (Exception ex)
            {
                return CrearResultadoError($"Error al realizar la búsqueda: {ex.Message}");
            }
        }

        #region Métodos de Inicialización
        private (DataTable tblParametros, DataTable tblAgrupar, DateTime fechaDesde) InicializarTablas(
            int idCartera, int? idConsulta, DateTime? desdeFecha)
        {
            var tblParametros = CrearTablaParametros();
            var tblAgrupar = CrearTablaAgrupar();
            var fechaDesde = desdeFecha ?? DateTime.Today.AddMonths(-1);

            if (idConsulta.HasValue)
                AplicarConsultaGuardada(idConsulta.Value, ref idCartera, ref fechaDesde);
            else
                tblParametros.Rows.Add("Cuenta", "idCartera", idCartera.ToString(), "AND", "int");

            return (tblParametros, tblAgrupar, fechaDesde);
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
        #endregion

        #region Métodos de Procesamiento de Parámetros
        private string ProcesarYValidarParametros(IEnumerable<ParameterDto>? parametrosExtra, DataTable tblParametros)
        {
            if (parametrosExtra == null) return null;

            foreach (var parametro in parametrosExtra)
            {
                var (simbolo, valor) = ExtraerSimboloYValor(parametro.Valores);
                var error = ValidarYAgregarParametro(
                    parametro.Concepto, parametro.Campo, simbolo, valor,
                    parametro.Parámetros, tblParametros);

                if (!string.IsNullOrEmpty(error))
                    return error;
            }
            return null;
        }

        private (string simbolo, string valor) ExtraerSimboloYValor(string valores)
        {
            if (string.IsNullOrEmpty(valores))
                return ("=", "");

            var simbolos = new[] { "≠", "≤", "≥", ">", "<", "=" };
            var simboloEncontrado = simbolos.FirstOrDefault(valores.StartsWith);

            return simboloEncontrado != null
                ? (simboloEncontrado, valores.Substring(simboloEncontrado.Length).Trim())
                : ("=", valores.Trim());
        }

        private string ValidarYAgregarParametro(string concepto, string campo, string simbolo,
            string valor, string id, DataTable tblParametros)
        {
            valor = valor?.Replace("'", "") ?? "";
            var signos = ConvertirSimboloASigno(simbolo);
            var drFila = ObtenerOCrearFilaParametro(concepto, campo, tblParametros);

            // Validaciones de consistencia de símbolos
            var errorValidacion = ValidarConsistenciaSimbolos(drFila, signos, simbolo);
            if (!string.IsNullOrEmpty(errorValidacion))
                return errorValidacion;

            // Validaciones específicas por concepto
            return concepto?.ToLower() switch
            {
                "teléfonos" => ValidarParametroTelefonos(campo, simbolo, valor, id, signos, drFila),
                "gestiones" => ValidarParametroGestiones(campo, simbolo, valor, id, signos, drFila),
                "negociaciones" => ValidarParametroNegociaciones(campo, simbolo, valor, id, signos, drFila),
                "seguimientos" => ValidarParametroSeguimientos(campo, simbolo, valor, id, signos, drFila),
                "chats" => ValidarParametroChats(campo, simbolo, valor, id, signos, drFila),
                _ => ValidarParametroGeneral(campo, simbolo, valor, id, signos, drFila)
            };
        }

        private string ValidarConsistenciaSimbolos(DataRow drFila, string signos, string simbolo)
        {
            var parametros = drFila["Parámetros"].ToString();
            var valores = drFila["Valores"].ToString();

            if (parametros.Contains(">") && (signos == "=" || signos.StartsWith(">")))
                return "Solo puede asignar una desigualdad en el otro sentido <.";

            if (parametros.Contains("<") && (signos == "=" || signos.StartsWith("<")))
                return "Solo puede asignar una desigualdad en el otro sentido >.";

            if (valores.Contains("≠") && simbolo != "≠")
                return "Ya tiene un signo ≠, solo puede agregar más parámetros de ≠.";

            if (valores.Contains("=") && simbolo != "=")
                return "Ya tiene un signo =, solo puede agregar más parámetros de =.";

            return null;
        }

        private DataRow ObtenerOCrearFilaParametro(string concepto, string campo, DataTable tblParametros)
        {
            var filaExistente = tblParametros.AsEnumerable()
                .FirstOrDefault(r => r["Concepto"].ToString() == concepto && r["Campo"].ToString() == campo);

            return filaExistente ?? tblParametros.Rows.Add(concepto, campo, "", "", "");
        }
        #endregion

        #region Validadores por Concepto
        private string ValidarParametroTelefonos(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            return campo?.ToLower() switch
            {
                "teléfono" => ValidarTelefono(campo, simbolo, valor, drFila),
                "entidadfederativa" => ValidarEntidadFederativa(campo, simbolo, valor, drFila),
                "clase" or "telefonía" or "origen" or "confirmado" or "municipio"
                    => ValidarCampoCatalogo(campo, simbolo, valor, id, drFila),
                "últimamarcación" => ValidarFecha(campo, simbolo, valor, signos, drFila, "date"),
                _ => ValidarNumeroEntero(campo, simbolo, valor, signos, drFila)
            };
        }

        private string ValidarParametroGestiones(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            return campo?.ToLower() switch
            {
                "fecha" => ValidarFecha(campo, simbolo, valor, signos, drFila, "date"),
                "hora" or "duración" or "tiempoencuenta" => ValidarTiempo(campo, simbolo, valor, signos, drFila),
                "usuario" => ValidarUsuario(campo, simbolo, valor, drFila),
                "teléfono" => ValidarTelefono(campo, simbolo, valor, drFila),
                "extensión" => ValidarExtension(campo, simbolo, valor, drFila),
                "comentario" or "nombrecontacto" => ValidarTextoBusqueda(campo, simbolo, valor, drFila),
                _ => ValidarCampoCatalogo(campo, simbolo, valor, id, drFila)
            };
        }

        private string ValidarParametroNegociaciones(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            return campo?.ToLower() switch
            {
                "fechacreación" or "fechaacordada" or "fechafinnegociación" or "fecha_plazo"
                    => ValidarFecha(campo, simbolo, valor, signos, drFila, "date"),
                "hora" => ValidarTiempo(campo, simbolo, valor, signos, drFila),
                "usuario" or "validador" => ValidarUsuario(campo, simbolo, valor, drFila),
                "correo" => ValidarCorreo(campo, simbolo, valor, drFila),
                "pagos" or "plazos" or "montonegociado" or "montopagado" or "saldonegociación"
                    => ValidarNumeroEntero(campo, simbolo, valor, signos, drFila),
                _ => ValidarCampoCatalogo(campo, simbolo, valor, id, drFila)
            };
        }

        private string ValidarParametroSeguimientos(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            return campo?.ToLower() switch
            {
                "fechacreación" or "fechaseguimiento" => ValidarFecha(campo, simbolo, valor, signos, drFila, "date"),
                "horacreación" or "horaseguimiento" => ValidarTiempo(campo, simbolo, valor, signos, drFila),
                "usuario" => ValidarUsuario(campo, simbolo, valor, drFila),
                "teléfono" => ValidarTelefono(campo, simbolo, valor, drFila),
                "recordatorio" or "realizado" => ValidarCampoCatalogo(campo, simbolo, valor, id, drFila),
                _ => ValidarCampoCatalogo(campo, simbolo, valor, id, drFila)
            };
        }

        private string ValidarParametroChats(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            return campo?.ToLower() switch
            {
                "fecha" => ValidarFecha(campo, simbolo, valor, signos, drFila, "date"),
                "hora" or "duración" => ValidarTiempo(campo, simbolo, valor, signos, drFila),
                "usuario" => ValidarUsuario(campo, simbolo, valor, drFila),
                "teléfono" => ValidarTelefono(campo, simbolo, valor, drFila),
                "extensión" => ValidarExtension(campo, simbolo, valor, drFila),
                "comentario" => ValidarTextoBusqueda(campo, simbolo, valor, drFila),
                "salida" => ValidarCampoCatalogo(campo, simbolo, valor, id, drFila),
                _ => ValidarCampoCatalogo(campo, simbolo, valor, id, drFila)
            };
        }

        private string ValidarParametroGeneral(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            if (drFila["Parámetros"].ToString().Contains(id))
                return "Ya estableció dicho parámetro.";

            ActualizarFilaParametro(drFila, $"{simbolo} {valor}", id, "list");
            return null;
        }

        // Métodos de validación específicos
        private string ValidarTelefono(string campo, string simbolo, string valor, DataRow drFila)
        {
            if (!long.TryParse(valor, out _) || valor.Trim().Length != 10 || valor.Contains("-"))
                return "El número telefónico debe ser a 10 dígitos.";

            return ValidarDuplicadoYActualizar(drFila, simbolo, $"\"{valor}\"", valor, "list");
        }

        private string ValidarUsuario(string campo, string simbolo, string valor, DataRow drFila)
        {
            if (valor.Trim().Length < 4 || valor.Trim().Length > 5 || !SonLetras(valor))
                return "El usuario debe de ser de 4 o 5 letras.";

            return ValidarDuplicadoYActualizar(drFila, simbolo, $"\"{valor.ToUpper()}\"", $"'{valor.ToUpper()}'", "list");
        }

        private string ValidarExtension(string campo, string simbolo, string valor, DataRow drFila)
        {
            if (!long.TryParse(valor, out _) || valor.Trim().Length > 5 || valor.Trim().Length < 3 || valor.Contains("-"))
                return "La extensión debe ser de 3 a 5 dígitos.";

            return ValidarDuplicadoYActualizar(drFila, simbolo, $"\"{valor.ToUpper()}\"", $"'{valor.ToUpper()}'", "list");
        }

        private string ValidarCorreo(string campo, string simbolo, string valor, DataRow drFila)
        {
            return ValidarDuplicadoYActualizar(drFila, simbolo, $"\"{valor.ToUpper()}\"", $"'{valor.ToUpper()}'", "list");
        }

        private string ValidarFecha(string campo, string simbolo, string valor, string signos, DataRow drFila, string tipoDato)
        {
            if (!DateTime.TryParse(valor, out var dtFecha))
                return "Ingrese una fecha válida, de preferencia en formato (yyyy-mm-dd).";

            var valorFormateado = dtFecha.ToString("yyyy-MM-dd");
            return ValidarDuplicadoYActualizar(drFila, simbolo, valorFormateado, $"{signos}'{valorFormateado}'", tipoDato);
        }

        private string ValidarTiempo(string campo, string simbolo, string valor, string signos, DataRow drFila)
        {
            if (!TimeSpan.TryParse(valor, out var tsTiempo))
                return "El tiempo debe escribirse en formato de 24hrs (hh:mm:ss).";

            var valorFormateado = tsTiempo.ToString(@"hh\:mm\:ss");
            return ValidarDuplicadoYActualizar(drFila, simbolo, valorFormateado, $"{signos}'{valorFormateado}'", "time");
        }

        private string ValidarEntidadFederativa(string campo, string simbolo, string valor, DataRow drFila)
        {
            return ValidarDuplicadoYActualizar(drFila, simbolo, $"\"{valor.ToUpper()}\"", $"'{valor.ToUpper()}'", "list");
        }

        private string ValidarCampoCatalogo(string campo, string simbolo, string valor, string id, DataRow drFila)
        {
            if (drFila["Parámetros"].ToString().Contains(id))
                return "Ya estableció dicho parámetro.";

            var separador = campo == "Municipio" ? "','" : ",";
            var parametros = string.IsNullOrEmpty(drFila["Parámetros"].ToString())
                ? id
                : $"{drFila["Parámetros"]}{separador}{id}";

            ActualizarFilaParametro(drFila, $"{simbolo} {valor}", parametros, "list");
            return null;
        }

        private string ValidarTextoBusqueda(string campo, string simbolo, string valor, DataRow drFila)
        {
            return ValidarDuplicadoYActualizar(drFila, simbolo, $"\"{valor}\"", $"'%{valor}%'", "list");
        }

        private string ValidarNumeroEntero(string campo, string simbolo, string valor, string signos, DataRow drFila)
        {
            if (!long.TryParse(valor, out var numero))
                return "Indique una cantidad de números enteros.";

            return ValidarDuplicadoYActualizar(drFila, simbolo, valor, $"{signos}{numero}", "int");
        }

        private string ValidarDuplicadoYActualizar(DataRow drFila, string simbolo, string valores, string parametros, string tipoDato)
        {
            if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(simbolo + valores.ToLower()))
                return "Ya estableció dicho parámetro.";

            ActualizarFilaParametro(drFila, $"{simbolo} {valores}", parametros, tipoDato);
            return null;
        }
        #endregion

        #region Métodos de Construcción y Ejecución de Query
        private async Task<string> ConstruirQueryConEnmascaramiento(
            string servidor, int idCartera, string conceptoPrincipal, DataTable tblParametros,
            DataTable tblAgrupar, Resultado modoResultado, DateTime fechaDesde,
            int? idConsulta, int jerarquia)
        {
            var consulta = new ConsultaGenerador(_dbContFactory);

            var query = await consulta.QueryGeneral(
                servidor, idCartera, conceptoPrincipal, tblParametros, tblAgrupar,
                modoResultado, fechaDesde, 0, idConsulta ?? 0);

            LogJerarquiaEnmascaramiento(jerarquia, modoResultado);

            // Aplicar enmascaramiento según jerarquía si es detalle
            if (modoResultado == Resultado.Detalle && jerarquia < 3)
                query = AplicarEnmascaramientoCuenta(query, idCartera);

            Console.WriteLine(query);
            return $"WAITFOR DELAY '00:00:00'; USE dbCollection; SET DATEFORMAT YMD;\r\n{query}";
        }

        private void LogJerarquiaEnmascaramiento(int jerarquia, Resultado modoResultado)
        {
            Console.WriteLine($"   Aplicar enmascaramiento: {(modoResultado == Resultado.Detalle && jerarquia < 3 ? "SÍ" : "NO")}");

        }

        private string AplicarEnmascaramientoCuenta(string query, int idCartera)
        {

            var queryEnmascarado = idCartera == 1
                ? query.Replace("Z.idCuenta AS 'Cuenta'", "STUFF(STUFF(Z.idCuenta,1,2,'XX'),13, 2,'XX') [Cuenta]")
                : query.Replace("Z.idCuenta AS 'Cuenta'", "STUFF(Z.idCuenta,1,LEN(Z.idCuenta)-4,'XXX-XXX-') [Cuenta]");

            return queryEnmascarado;
        }
        #endregion

        #region Métodos de Utilidad
        private string ConvertirSimboloASigno(string simbolo) => simbolo switch
        {
            "≤" => "<=",
            "≥" => ">=",
            _ => simbolo
        };

        private void ActualizarFilaParametro(DataRow drFila, string valores, string parametros, string tipoDato)
        {
            var valoresActual = drFila["Valores"].ToString();
            var parametrosActual = drFila["Parámetros"].ToString();

            if (!string.IsNullOrEmpty(valoresActual))
            {
                drFila["Valores"] = $"{valoresActual}, {valores}";
                drFila["Parámetros"] = $"{parametrosActual}, {parametros}";
            }
            else
            {
                drFila["Valores"] = valores;
                drFila["Parámetros"] = parametros;
            }
            drFila["Dato"] = tipoDato;
        }

        private bool SonLetras(string texto) =>
            !string.IsNullOrEmpty(texto) && texto.All(char.IsLetter);

        private SearchResultDto CrearResultadoError(string mensaje) => new()
        {
            Mensaje = mensaje,
            EsError = true
        };
        #endregion

        #region Métodos de Respuesta y Conversión
        private List<Dictionary<string, object>> ConvertirTablaRespuesta(DataTable tabla, int idCartera, int jerarquia)
        {
            if (tabla == null || tabla.Rows.Count == 0)
                return new List<Dictionary<string, object>>();

            Console.WriteLine($"🔍 Procesando {tabla.Rows.Count} filas - Jerarquía: {jerarquia}");

            return tabla.Rows.Cast<DataRow>()
                .Select(row => CrearDiccionarioFila(row, idCartera, jerarquia))
                .ToList();
        }

        private Dictionary<string, object> CrearDiccionarioFila(DataRow row, int idCartera, int jerarquia)
        {
            var dict = new Dictionary<string, object>();

            foreach (DataColumn col in row.Table.Columns)
            {
                var value = row[col];

                if (jerarquia < 3 && col.ColumnName.Equals("Cuenta", StringComparison.OrdinalIgnoreCase))
                    value = AplicarEnmascaramientoSiNecesario(value, idCartera);

                dict[col.ColumnName] = value == DBNull.Value ? null : value;
            }

            return dict;
        }

        private object AplicarEnmascaramientoSiNecesario(object value, int idCartera)
        {
            if (value == DBNull.Value || string.IsNullOrEmpty(value.ToString()))
                return value;

            var cuenta = value.ToString();

            // Si ya está enmascarada, no hacer nada
            if (cuenta.Contains("XXX") || cuenta.Contains("XX"))
                return cuenta;

            return EnmascararCuentaPorJerarquia(cuenta, idCartera);
        }

        private string EnmascararCuentaPorJerarquia(string cuenta, int idCartera)
        {
            if (string.IsNullOrEmpty(cuenta)) return cuenta;

            return idCartera == 1
                ? EnmascararCartera1(cuenta)
                : EnmascararOtrasCarteras(cuenta);
        }

        private string EnmascararCartera1(string cuenta)
        {
            if (cuenta.Length >= 13)
                return "XX" + cuenta.Substring(2, 11) + "XX";
            else if (cuenta.Length >= 2)
                return "XX" + cuenta.Substring(2);

            return cuenta;
        }

        private string EnmascararOtrasCarteras(string cuenta)
        {
            if (cuenta.Length > 4)
                return "XXX-XXX-" + cuenta.Substring(cuenta.Length - 4);

            return new string('X', Math.Max(0, cuenta.Length - 5)) + cuenta[^5..];
        }
        #endregion

        #region Métodos de Consulta y Agrupación
        private void AplicarConsultaGuardada(int idConsulta, ref int idCartera, ref DateTime fechaDesde)
        {
            var consultaRow = ConsultaGenerador.ObtenerConsulta(idConsulta);
            if (consultaRow == null)
                throw new Exception($"No se encontró la consulta con ID {idConsulta}");

            idCartera = Convert.ToInt32(consultaRow["idCartera"]);
            if (consultaRow["Desde"] != DBNull.Value)
                fechaDesde = Convert.ToDateTime(consultaRow["Desde"]);
        }

        private void ProcesarAgrupacionesExtra(IEnumerable<AgruparDTO>? agruparExtra, DataTable tblAgrupar)
        {
            if (agruparExtra == null) return;

            foreach (var agrupacion in agruparExtra)
            {
                if (!AgrupacionExiste(tblAgrupar, agrupacion.Campo, agrupacion.Concepto))
                    tblAgrupar.Rows.Add(agrupacion.Campo, agrupacion.Concepto);
            }
        }

        private static Resultado DeterminarModoDeResultado(int tipoResultado) => tipoResultado switch
        {
            2 => Resultado.Detalle,
            3 => Resultado.Cuentas,
            4 => Resultado.FilaDeTrabajo,  
            _ => Resultado.Contar
        };

        private async Task<DataTable> EjecutarConsultaAsync(string servidor, string sql)
        {
            using var connection = _dbContFactory.GetSqlConnection(servidor, "Collection");
            await connection.OpenAsync();
            using var reader = await connection.ExecuteReaderAsync(sql);

            var tabla = new DataTable("Cuentas");
            tabla.Load(reader);
            return tabla;
        }

        private bool AgrupacionExiste(DataTable tblAgrupar, string campo, string concepto) =>
            tblAgrupar.AsEnumerable().Any(row =>
                row["Campo"].ToString() == campo &&
                row["Concepto"].ToString() == concepto);

        private string DeterminarConceptoPrincipal(IEnumerable<ParameterDto>? parametrosExtra, IEnumerable<AgruparDTO>? agruparExtra) =>
            parametrosExtra?.FirstOrDefault()?.Concepto ??
            agruparExtra?.FirstOrDefault()?.Concepto ??
            "Cuenta";

        private void ProcesarParametrosExtra(IEnumerable<ParameterDto>? parametrosExtra, DataTable tblParametros)
        {
            if (parametrosExtra == null) return;

            foreach (var p in parametrosExtra)
            {
                ValidarParametro(p);
                string tipoDato = ObtenerTipoDato(p.Concepto, p.Campo, p.Dato);

                if (EsDuplicado(tblParametros, p))
                    continue;

                tblParametros.Rows.Add(p.Concepto, p.Campo, p.Valores, p.Parámetros, tipoDato);
            }
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

        private string ObtenerTipoDato(string concepto, string campo, string? datoFromRequest)
        {
            if (!string.IsNullOrEmpty(datoFromRequest))
                return datoFromRequest.ToLower();

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
                _ => "string"
            };
        }

        private bool EsDuplicado(DataTable tblParametros, ParameterDto p) =>
            tblParametros.AsEnumerable().Any(r =>
                r["Concepto"].ToString() == p.Concepto &&
                r["Campo"].ToString() == p.Campo &&
                r["Valores"].ToString() == p.Valores);
        #endregion
    }
}