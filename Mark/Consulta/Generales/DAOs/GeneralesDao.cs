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

        public async Task<SearchResultDto> RealizaBusqueda(int idProducto, int idCartera,string servidor,int tipoResultado,int jerarquia,int? idConsulta = null,IEnumerable<ParameterDto>? parametrosExtra = null,IEnumerable<AgruparDTO>? agruparExtra = null,DateTime? desdeFecha = null)
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

                string errorValidacion = ProcesarParametrosExtraConValidacion(parametrosExtra, tblParametros);
                if (!string.IsNullOrEmpty(errorValidacion))
                {
                    return new SearchResultDto
                    {
                        Mensaje = $"Error en validación de parámetros: {errorValidacion}",
                        EsError = true
                    };
                }

                ProcesarAgrupacionesExtra(agruparExtra, tblAgrupar);

                var modoResultado = DeterminarModoDeResultado(tipoResultado);

                var consulta = new ConsultaGenerador(_dbContFactory);

                string conceptoPrincipal = DeterminarConceptoPrincipal(parametrosExtra, agruparExtra);

                string query = await consulta.QueryGeneral(
                    servidor,
                    idCartera,
                    conceptoPrincipal,
                    tblParametros,
                    tblAgrupar,
                    modoResultado,
                    fechaDesde,
                    0,
                    idConsulta ?? 0);

                // ======== AGREGAR AQUÍ ========
                Console.WriteLine($"🔍 === INFORMACIÓN DE JERARQUÍA ===");
                Console.WriteLine($"   Jerarquía recibida del JSON: {jerarquia}");
                Console.WriteLine($"   Tipo resultado: {modoResultado}");
                Console.WriteLine($"   Aplicar enmascaramiento: {(modoResultado == Resultado.Detalle && jerarquia < 3 ? "SÍ" : "NO")}");
                Console.WriteLine($"🔍 ===============================\n");

                // Aplicar enmascaramiento según jerarquía si es detalle
                if (modoResultado == Resultado.Detalle && jerarquia < 3)
                {
                    query = AplicarEnmascaramientoCuenta(query, idCartera);
                    Console.WriteLine($"✅ Enmascaramiento aplicado para jerarquía {jerarquia}");
                }
                else
                {
                    Console.WriteLine($"ℹ️  Sin enmascaramiento - Jerarquía: {jerarquia}, Modo: {modoResultado}");
                }

                Console.WriteLine(query);

                string sql = $"WAITFOR DELAY '00:00:00'; USE dbCollection; SET DATEFORMAT YMD;\r\n{query}";

                var tblCuentas = await EjecutarConsultaAsync(servidor, sql);

                return new SearchResultDto
                {
                    Mensaje = "Búsqueda terminada",
                    EsError = false,
                    TotalFilasEncontradas = tblCuentas.Rows.Count,
                    Datos = ConvertirTablaRespuesta(tblCuentas, idCartera, jerarquia)  // ← CORRECTO: Con parámetros
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

        private string ProcesarParametrosExtraConValidacion(IEnumerable<ParameterDto>? parametrosExtra, DataTable tblParametros)
        {
            if (parametrosExtra == null) return null;

            foreach (var p in parametrosExtra)
            {
                var (simbolo, valor) = ExtraerSimboloYValor(p.Valores);
                var id = p.Parámetros;

                string error = ValidarYAgregarParametro(p.Concepto, p.Campo, simbolo, valor, id, tblParametros);
                if (!string.IsNullOrEmpty(error))
                {
                    return error;
                }
            }

            return null;
        }

        private (string simbolo, string valor) ExtraerSimboloYValor(string valores)
        {
            if (string.IsNullOrEmpty(valores))
                return ("=", "");

            var simbolos = new[] { "≠", "≤", "≥", ">", "<", "=" };
            foreach (var simbolo in simbolos)
            {
                if (valores.StartsWith(simbolo))
                {
                    return (simbolo, valores.Substring(simbolo.Length).Trim());
                }
            }

            return ("=", valores.Trim());
        }

        private string ValidarYAgregarParametro(string concepto, string campo, string simbolo, string valor, string id, DataTable tblParametros)
        {
            long iNumero;
            DateTime dtFecha;
            TimeSpan tsTiempo;
            string signos = simbolo;

            valor = valor?.Replace("'", "") ?? "";

            if (simbolo == "≤")
                signos = "<=";
            else if (simbolo == "≥")
                signos = ">=";

            DataRow drFila = null;
            var filasExistentes = tblParametros.AsEnumerable()
                .Where(r => r["Concepto"].ToString() == concepto && r["Campo"].ToString() == campo)
                .ToList();

            if (filasExistentes.Any())
            {
                drFila = filasExistentes.First();

                if (drFila["Parámetros"].ToString().Contains(">") && (signos == "=" || signos.StartsWith(">")))
                    return "Solo puede asignar una desigualdad en el otro sentido <.";

                if (drFila["Parámetros"].ToString().Contains("<") && (signos == "=" || signos.StartsWith("<")))
                    return "Solo puede asignar una desigualdad en el otro sentido >.";

                if (drFila["Valores"].ToString().Contains("≠") && simbolo != "≠")
                    return "Ya tiene un signo ≠, solo puede agregar más parámetros de ≠.";

                if (drFila["Valores"].ToString().Contains("=") && simbolo != "=")
                    return "Ya tiene un signo =, solo puede agregar más parámetros de =.";
            }
            else
            {
                drFila = tblParametros.Rows.Add(concepto, campo, "", "", "");
            }

            switch (concepto)
            {
                case "Teléfonos":
                    return ValidarParametroTelefonos(campo, simbolo, valor, id, signos, drFila);
                case "Gestiones":
                    return ValidarParametroGestiones(campo, simbolo, valor, id, signos, drFila);
                case "Negociaciones":
                    return ValidarParametroNegociaciones(campo, simbolo, valor, id, signos, drFila);
                case "Seguimientos":
                    return ValidarParametroSeguimientos(campo, simbolo, valor, id, signos, drFila);
                case "Chats":
                    return ValidarParametroChats(campo, simbolo, valor, id, signos, drFila);
                default:
                    return ValidarParametroGeneral(campo, simbolo, valor, id, signos, drFila);
            }
        }

        private string ValidarParametroTelefonos(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            long iNumero;
            DateTime dtFecha;

            switch (campo)
            {
                case "Teléfono":
                    if (!long.TryParse(valor, out iNumero) || valor.Trim().Length != 10 || valor.Contains("-"))
                        return "El número telefónico debe ser a 10 dígitos.";

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(simbolo + "\"" + valor.ToLower() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor + "\"", valor, "list");
                    break;

                case "EntidadFederativa":
                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor.ToUpper() + "\"", "'" + valor.ToUpper() + "'", "list");
                    break;

                case "Clase":
                case "Telefonía":
                case "Origen":
                case "Confirmado":
                case "Municipio":
                    if (drFila["Parámetros"].ToString().Contains(id))
                        return "Ya estableció dicho parámetro.";

                    if (campo == "Municipio")
                        ActualizarFilaParametro(drFila, simbolo + " " + valor, "','" + id, "list");
                    else
                        ActualizarFilaParametro(drFila, simbolo + " " + valor, id, "list");
                    break;

                case "ÚltimaMarcación":
                    if (!DateTime.TryParse(valor, out dtFecha))
                        return "Ingrese una fecha válida, de preferencia en formato (yyyy-mm-dd).";

                    valor = dtFecha.ToString("yyyy-MM-dd");

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(simbolo + valor.ToLower()))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, signos + "'" + valor + "'", "date");
                    break;

                default:
                    if (!long.TryParse(valor, out iNumero))
                        return "Indique una cantidad de números enteros.";

                    if (drFila["Valores"].ToString().Contains(simbolo + valor))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, signos + iNumero, "int");
                    break;
            }

            return null;
        }

        private string ValidarParametroGestiones(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            long iNumero;
            DateTime dtFecha;
            TimeSpan tsTiempo;

            switch (campo)
            {
                case "Fecha":
                    if (!DateTime.TryParse(valor, out dtFecha))
                        return "Ingrese una fecha válida, de preferencia en formato (yyyy-mm-dd).";

                    valor = dtFecha.ToString("yyyy-MM-dd");

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(simbolo + valor.ToLower()))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, signos + "'" + valor + "'", "date");
                    break;

                case "Hora":
                case "Duración":
                case "TiempoEnCuenta":
                    if (!TimeSpan.TryParse(valor, out tsTiempo))
                        return "El tiempo debe escribirse en formato de 24hrs (hh:mm:ss).";

                    valor = tsTiempo.ToString(@"hh\:mm\:ss");

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(simbolo + valor.ToLower()))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, signos + "'" + valor + "'", "time");
                    break;

                case "Usuario":
                    if (valor.Trim().Length < 4 || valor.Trim().Length > 5 || !SonLetras(valor))
                        return "El usuario debe de ser de 4 o 5 letras.";

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor.ToUpper() + "\"", "'" + valor.ToUpper() + "'", "list");
                    break;

                case "Teléfono":
                    if (!long.TryParse(valor, out iNumero) || valor.Trim().Length != 10 || valor.Contains("-"))
                        return "El número telefónico debe ser a 10 dígitos.";

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor.ToUpper() + "\"", "'" + valor.ToUpper() + "'", "list");
                    break;

                case "Extensión":
                    if (!long.TryParse(valor, out iNumero) || valor.Trim().Length > 5 || valor.Trim().Length < 3 || valor.Contains("-"))
                        return "La extensión debe ser de 3 a 5 dígitos.";

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor.ToUpper() + "\"", "'" + valor.ToUpper() + "'", "list");
                    break;

                case "Comentario":
                case "NombreContacto":
                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor + "\"", "'%" + valor + "%'", "list");
                    break;

                default:
                    if (drFila["Parámetros"].ToString().Contains(id))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, id, "list");
                    break;
            }

            return null;
        }

        private string ValidarParametroNegociaciones(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            long iNumero;
            DateTime dtFecha;
            TimeSpan tsTiempo;

            switch (campo)
            {
                case "FechaCreación":
                case "FechaAcordada":
                case "FechaFinNegociación":
                case "Fecha_Plazo":
                    if (!DateTime.TryParse(valor, out dtFecha))
                        return "Ingrese una fecha válida, de preferencia en formato (yyyy-mm-dd).";

                    valor = dtFecha.ToString("yyyy-MM-dd");

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(simbolo + valor.ToLower()))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, signos + "'" + valor + "'", "date");
                    break;

                case "Hora":
                    if (!TimeSpan.TryParse(valor, out tsTiempo))
                        return "El tiempo debe escribirse en formato de 24hrs (hh:mm:ss).";

                    valor = tsTiempo.ToString(@"hh\:mm\:ss");

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(simbolo + valor.ToLower()))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, signos + "'" + valor + "'", "time");
                    break;

                case "Usuario":
                case "Validador":
                    if (valor.Trim().Length < 4 || valor.Trim().Length > 5 || !SonLetras(valor))
                        return "El usuario debe de ser de 4 o 5 letras.";

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor.ToUpper() + "\"", "'" + valor.ToUpper() + "'", "list");
                    break;

                case "Correo":
                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor.ToUpper() + "\"", "'" + valor.ToUpper() + "'", "list");
                    break;

                case "Pagos":
                case "Plazos":
                case "MontoNegociado":
                case "MontoPagado":
                case "SaldoNegociación":
                    if (!long.TryParse(valor, out iNumero))
                        return "Indique una cantidad de números enteros.";

                    if (drFila["Valores"].ToString().Contains(simbolo + valor))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, signos + iNumero, "int");
                    break;

                default:
                    if (drFila["Parámetros"].ToString().Contains(id))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, id, "list");
                    break;
            }

            return null;
        }

        private string ValidarParametroSeguimientos(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            long iNumero;
            DateTime dtFecha;
            TimeSpan tsTiempo;

            switch (campo)
            {
                case "FechaCreación":
                case "FechaSeguimiento":
                    if (!DateTime.TryParse(valor, out dtFecha))
                        return "Ingrese una fecha válida, de preferencia en formato (yyyy-mm-dd).";

                    valor = dtFecha.ToString("yyyy-MM-dd");

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(simbolo + valor.ToLower()))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, signos + "'" + valor + "'", "date");
                    break;

                case "HoraCreación":
                case "HoraSeguimiento":
                    if (!TimeSpan.TryParse(valor, out tsTiempo))
                        return "El tiempo debe escribirse en formato de 24hrs (hh:mm:ss).";

                    valor = tsTiempo.ToString(@"hh\:mm\:ss");

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(simbolo + valor.ToLower()))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, signos + "'" + valor + "'", "time");
                    break;

                case "Usuario":
                    if (valor.Trim().Length < 4 || valor.Trim().Length > 5 || !SonLetras(valor))
                        return "El usuario debe de ser de 4 o 5 letras.";

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor.ToUpper() + "\"", "'" + valor.ToUpper() + "'", "list");
                    break;

                case "Teléfono":
                    if (!long.TryParse(valor, out iNumero) || valor.Trim().Length != 10 || valor.Contains("-"))
                        return "El número telefónico debe ser a 10 dígitos.";

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor.ToUpper() + "\"", "'" + valor.ToUpper() + "'", "list");
                    break;

                case "Recordatorio":
                case "Realizado":
                    if (drFila["Parámetros"].ToString().Contains(id))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, id, "list");
                    break;

                default:
                    if (drFila["Parámetros"].ToString().Contains(id))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, id, "list");
                    break;
            }

            return null;
        }

        private string ValidarParametroChats(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            long iNumero;
            DateTime dtFecha;
            TimeSpan tsTiempo;

            switch (campo)
            {
                case "Fecha":
                    if (!DateTime.TryParse(valor, out dtFecha))
                        return "Ingrese una fecha válida, de preferencia en formato (yyyy-mm-dd).";

                    valor = dtFecha.ToString("yyyy-MM-dd");

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(simbolo + valor.ToLower()))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, signos + "'" + valor + "'", "date");
                    break;

                case "Hora":
                case "Duración":
                    if (!TimeSpan.TryParse(valor, out tsTiempo))
                        return "El tiempo debe escribirse en formato de 24hrs (hh:mm:ss).";

                    valor = tsTiempo.ToString(@"hh\:mm\:ss");

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToLower().Contains(simbolo + valor.ToLower()))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, signos + "'" + valor + "'", "time");
                    break;

                case "Usuario":
                    if (valor.Trim().Length < 4 || valor.Trim().Length > 5 || !SonLetras(valor))
                        return "El usuario debe de ser de 4 o 5 letras.";

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor.ToUpper() + "\"", "'" + valor.ToUpper() + "'", "list");
                    break;

                case "Teléfono":
                    if (!long.TryParse(valor, out iNumero) || valor.Trim().Length != 10 || valor.Contains("-"))
                        return "El número telefónico debe ser a 10 dígitos.";

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor.ToUpper() + "\"", "'" + valor.ToUpper() + "'", "list");
                    break;

                case "Extensión":
                    if (!long.TryParse(valor, out iNumero) || valor.Trim().Length > 5 || valor.Trim().Length < 3 || valor.Contains("-"))
                        return "La extensión debe ser de 3 a 5 dígitos.";

                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor.ToUpper() + "\"", "'" + valor.ToUpper() + "'", "list");
                    break;

                case "Comentario":
                    if (drFila["Valores"].ToString() != "" && drFila["Valores"].ToString().ToUpper().Contains("\"" + valor.ToUpper() + "\""))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " \"" + valor + "\"", "'%" + valor + "%'", "list");
                    break;

                case "Salida":
                    if (drFila["Parámetros"].ToString().Contains(id))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, id, "list");
                    break;

                default:
                    if (drFila["Parámetros"].ToString().Contains(id))
                        return "Ya estableció dicho parámetro.";

                    ActualizarFilaParametro(drFila, simbolo + " " + valor, id, "list");
                    break;
            }

            return null;
        }

        private string ValidarParametroGeneral(string campo, string simbolo, string valor, string id, string signos, DataRow drFila)
        {
            if (drFila["Parámetros"].ToString().Contains(id))
                return "Ya estableció dicho parámetro.";

            ActualizarFilaParametro(drFila, simbolo + " " + valor, id, "list");
            return null;
        }

        private void ActualizarFilaParametro(DataRow drFila, string valores, string parametros, string tipoDato)
        {
            string valoresActual = drFila["Valores"].ToString();
            string parametrosActual = drFila["Parámetros"].ToString();

            if (!string.IsNullOrEmpty(valoresActual))
            {
                valoresActual += ", " + valores;
                parametrosActual += ", " + parametros;
            }
            else
            {
                valoresActual = valores;
                parametrosActual = parametros;
            }

            drFila["Valores"] = valoresActual.TrimStart(',', ' ');
            drFila["Parámetros"] = parametrosActual.TrimStart(',', ' ');
            drFila["Dato"] = tipoDato;
        }

        private bool SonLetras(string texto)
        {
            return !string.IsNullOrEmpty(texto) && texto.All(c => char.IsLetter(c));
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

        private string ObtenerOperador(ParameterDto p) => "AND";

        private string DeterminarConceptoPrincipal(IEnumerable<ParameterDto>? parametrosExtra, IEnumerable<AgruparDTO>? agruparExtra)
        {
            var conceptoParametros = parametrosExtra?.FirstOrDefault()?.Concepto;
            var conceptoAgrupar = agruparExtra?.FirstOrDefault()?.Concepto;
            return conceptoParametros ?? conceptoAgrupar ?? "Cuenta";
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
        private string AplicarEnmascaramientoCuenta(string query, int idCartera)
        {


            if (idCartera == 1)
            {
                string queryEnmascarado = query.Replace(
                    "Z.idCuenta AS 'Cuenta'",
                    "STUFF(STUFF(Z.idCuenta,1,2,'XX'),13, 2,'XX') [Cuenta]"
                );

                return queryEnmascarado;
            }
            else
            {
                string queryEnmascarado = query.Replace(
                    "Z.idCuenta AS 'Cuenta'",
                    "STUFF(Z.idCuenta,1,LEN(Z.idCuenta)-4,'XXX-XXX-') [Cuenta]"
                );
                return queryEnmascarado;
            }
        }

        private List<Dictionary<string, object>> ConvertirTablaRespuesta(DataTable tabla, int idCartera, int jerarquia)
        {
            var lista = new List<Dictionary<string, object>>();
            if (tabla == null || tabla.Rows.Count == 0) return lista;


            foreach (DataRow row in tabla.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tabla.Columns)
                {
                    object value = row[col];

                    // Aplicar enmascaramiento adicional si es necesario (segunda capa de seguridad)
                    if (jerarquia < 3 &&
                        col.ColumnName.Equals("Cuenta", StringComparison.OrdinalIgnoreCase) &&
                        value != DBNull.Value &&
                        !string.IsNullOrEmpty(value.ToString()))
                    {
                        value = EnmascararCuentaPorJerarquia(value.ToString(), idCartera);
                    }

                    dict[col.ColumnName] = value == DBNull.Value ? null : value;
                }

                lista.Add(dict);
            }

            return lista;
        }

        private string EnmascararCuentaPorJerarquia(string cuenta, int idCartera)
        {
            if (string.IsNullOrEmpty(cuenta))
                return cuenta;

            // Si la cuenta ya está enmascarada (contiene XXX), no hacer nada
            if (cuenta.Contains("XXX") || cuenta.Contains("XX"))
                return cuenta;

            if (idCartera == 1)
            {
                // Para cartera 1: STUFF(STUFF(Z.idCuenta,1,2,'XX'),13, 2,'XX')
                if (cuenta.Length >= 13)
                {
                    return "XX" + cuenta.Substring(2, 11) + "XX";
                }
                else if (cuenta.Length >= 2)
                {
                    return "XX" + cuenta.Substring(2);
                }
            }
            else
            {
                // Para otras carteras: STUFF(Z.idCuenta,1,LEN(Z.idCuenta)-4,'XXX-XXX-')
                if (cuenta.Length > 4)
                {
                    return "XXX-XXX-" + cuenta.Substring(cuenta.Length - 4);
                }
            }

            // Enmascaramiento por defecto
            return new string('X', Math.Max(0, cuenta.Length - 5)) + cuenta[^5..];
        }
       
    }
}