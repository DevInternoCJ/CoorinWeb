using System;
using System.Collections;
using System.Data;
using System.Linq; // Necesario para Linq si usas .Any() o similar
using CoorinWeb.Loki.Common;
using CoorinWeb.Loki.Global; // Se asume que IDbContextFactory está aquí

// --- Nuevo Namespace para Enums Comunes ---
namespace CoorinWeb.Loki.Common // Un buen lugar para enums genéricos
{
    public enum Resultado
    {
        Cuentas,
        Detalle,
        FilaDeTrabajo,
        ContarCuentas,
        ContarAccionamientos,
    }
}

// --- Namespace para Clases de Ayuda Globales de Loki ---
namespace CoorinWeb.Loki.Global
{
    // Asegúrate de que IDbContextFactory esté definido aquí o en un namespace accesible.
    // public interface IDbContextFactory { /* ... */ }

    // Clase Helper para generar queries de accionamientos (probablemente necesita un nombre más descriptivo)
    public class AccionamientosQueryHelper
    {
        private readonly IDbContextFactory _dbContextFactory;

        public AccionamientosQueryHelper(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        // Esta clase es un buen ejemplo de un DTO (Data Transfer Object) o un contenedor de resultados.
        // Podría estar en un namespace de 'Models' o 'DTOs' si se usa ampliamente.
        public class SqlQueryData
        {
            public string Query { get; set; } = string.Empty;
            public ArrayList Columns { get; set; } = new ArrayList();

            public string SqlQueryText { get; set; }
            public SqlQueryData(string query = "", ArrayList columns = null)
            {
                Query = query;
                Columns = columns ?? new ArrayList();
            }
        }

        // Clase estática para datos de configuración o tablas de parámetros.
        // Su nombre "Ejecutivo1" sugiere que podría ser específico de un ejecutivo,
        // lo cual podría necesitar una refactorización si la lógica es más general.
        public static class Ejecutivo1
        {
            public static DataTable TablaParámetros { get; private set; }
            public static DataTable TablaAgrupar { get; private set; }

            static Ejecutivo1()
            {
                TablaParámetros = new DataTable("Parametros");
                TablaParámetros.Columns.Add("Campo", typeof(string));
                TablaParámetros.Columns.Add("Operador", typeof(string));
                TablaParámetros.Columns.Add("Valor", typeof(string));
                TablaParámetros.Columns.Add("Logica", typeof(string));
                TablaParámetros.Columns.Add("Tipo", typeof(string));

                TablaAgrupar = new DataTable("Agrupar");
                TablaAgrupar.Columns.Add("Campo", typeof(string));
                TablaAgrupar.Columns.Add("Origen", typeof(string));
            }
        }

        // Clase principal para la generación de consultas dinámicas.
        public class ConsultaGenerador
        {
            private static DataSet _Consultas = new DataSet();

            static ConsultaGenerador()
            {
                DataTable dtConsultas = new DataTable("Consultas");
                dtConsultas.Columns.Add("idConsulta", typeof(int));
                dtConsultas.Columns.Add("idProducto", typeof(int));
                dtConsultas.Columns.Add("idCartera", typeof(int));
                dtConsultas.PrimaryKey = new DataColumn[] { dtConsultas.Columns["idConsulta"] };

                dtConsultas.Rows.Add(1, 101, 1);
                dtConsultas.Rows.Add(2, 102, 24);
                _Consultas.Tables.Add(dtConsultas);
            }

            public static SqlQueryData QueryCuentas(int idConsulta, ref ArrayList Columnas)
            {
                Columnas = new ArrayList(); // Asegura que la lista esté limpia al inicio

                DataTable tblParámetros = Ejecutivo1.TablaParámetros;
                DataTable tblAgrupar = Ejecutivo1.TablaAgrupar;

                DataRow drConsulta = _Consultas.Tables["Consultas"].Rows.Find(idConsulta);

                if (drConsulta == null || idConsulta <= 0)
                {
                    return new SqlQueryData();
                }

                DateTime dtDesde;
                LlenaConsulta(idConsulta, tblParámetros, tblAgrupar, out dtDesde);

                // Se usa el enum del nuevo namespace
                var result = GeneraQueryCuentas(
                    Convert.ToInt32(drConsulta["idProducto"]),
                    tblParámetros,
                    tblAgrupar,
                    CoorinWeb.Loki.Common.Resultado.Cuentas, // Uso explícito del namespace
                    dtDesde,
                    Convert.ToInt32(drConsulta["idCartera"]),
                    ref Columnas
                );

                return result;
            }

            //private static void LlenaConsulta(int idConsulta, DataTable tblParámetros, DataTable tblAgrupar, out DateTime dtDesde)
            //{
            //    Console.WriteLine($"Llenando consulta para idConsulta: {idConsulta}");

            //    tblParámetros.Rows.Clear();
            //    tblAgrupar.Rows.Clear();
            //    dtDesde = DateTime.Today.AddMonths(-1);

            //    if (idConsulta == 1)
            //    {
            //        tblParámetros.Rows.Add("Estado", "=", "Activo", "AND", "string");
            //        tblAgrupar.Rows.Add("Usuario", "Gestiones");
            //    }
            //    else if (idConsulta == 2)
            //    {
            //        tblParámetros.Rows.Add("Monto", ">", "1000", "AND", "decimal");
            //        tblAgrupar.Rows.Add("Fecha", "Negociaciones");
            //    }
            //}

            public static void LlenaConsulta(int idConsulta, DataTable Parámetros, DataTable Agrupar, out DateTime Desde)
            {

                DataRow drConsulta = _Consultas.Tables["Consultas"].Rows.Find(idConsulta);
                Desde = new DateTime();

                if (drConsulta == null)
                    return;

                Parámetros.Rows.Clear();
                DataRow[] drParámetros = drConsulta.GetChildRows("FK_Parámetros");
                for (int i = 0; i < drParámetros.Length; i++)
                    Parámetros.ImportRow(drParámetros[i]);

                Agrupar.Rows.Clear();
                DataRow[] drAgrupar = drConsulta.GetChildRows("FK_Agrupar");
                for (int i = 0; i < drAgrupar.Length; i++)
                    Agrupar.ImportRow(drAgrupar[i]);

                DateTime.TryParse(drConsulta["Desde"].ToString(), out Desde);
            }


            public static string QueryPagos(int idCartera, DateTime Desde, DateTime Hasta, int idConsulta)
            {
                ArrayList alColumnas = new ArrayList();
                string sSelect = "\tZ.*\r\n";
                // Llama a QueryCuentas dentro del mismo namespace
                SqlQueryData cuentasQueryData = ConsultaGenerador.QueryCuentas(idConsulta, ref alColumnas);

                foreach (string sColumna in alColumnas)
                    sSelect += "\t,CC.[" + sColumna + "]\r\n";

                string sQuery = "SELECT \r\n " + sSelect +
                                " FROM dbCollection.dbo.fn_PagosNegociaciones('" + Desde.ToString("yyyy-MM-dd") + "','" + Hasta.ToString("yyyy-MM-dd") + "', " + idCartera + ") Z ";

                if (!string.IsNullOrEmpty(cuentasQueryData.Query))
                    sQuery += "\tINNER JOIN ( \r\n " + cuentasQueryData.Query + "\t) CC " +
                              "\r\n\t ON Z.Cuenta = CC.idCuenta \r\n";

                return sQuery;
            }

            public static string QueryCorreos(int idCartera, int idConsulta)
            {
                ArrayList alColumnas = new ArrayList();
                string sSelect = "\tZ.*\r\n";
                SqlQueryData cuentasQueryData = ConsultaGenerador.QueryCuentas(idConsulta, ref alColumnas);

                foreach (string sColumna in alColumnas)
                    sSelect += "\t,CC.[" + sColumna + "]\r\n";

                string sQuery = "SELECT \r\n " + sSelect +
                                " FROM dbCollection.dbo.fn_CorreosCartera(" + idCartera + ") Z ";

                if (!string.IsNullOrEmpty(cuentasQueryData.Query))
                    sQuery += "\tINNER JOIN ( \r\n " + cuentasQueryData.Query + "\t) CC " +
                              "\r\n\t ON Z.Cuenta = CC.idCuenta \r\n";

                return sQuery;
            }

            public static string QueryDomicilios(int idCartera, int idConsulta)
            {
                ArrayList alColumnas = new ArrayList();
                string sSelect = "\tZ.*\r\n";
                SqlQueryData cuentasQueryData = ConsultaGenerador.QueryCuentas(idConsulta, ref alColumnas);

                foreach (string sColumna in alColumnas)
                    sSelect += "\t,CC.[" + sColumna + "]\r\n";

                string sQuery = "SELECT \r\n " + sSelect +
                                " FROM dbCollection.dbo.fn_DomiciliosVisitas(" + idCartera + ") Z ";

                if (!string.IsNullOrEmpty(cuentasQueryData.Query))
                    sQuery += "\tINNER JOIN ( \r\n " + cuentasQueryData.Query + "\t) CC " +
                              "\r\n\t ON Z.Cuenta = CC.idCuenta \r\n";

                return sQuery;
            }

            public static string QueryVisitas(int idCartera, DateTime FechaInicio, DateTime FechaFin, int idConsulta, bool Complemento)
            {
                ArrayList alColumnas = new ArrayList();
                string sSelect = "\tZ.*\r\n";
                SqlQueryData cuentasQueryData = ConsultaGenerador.QueryCuentas(idConsulta, ref alColumnas);

                foreach (string sColumna in alColumnas)
                    sSelect += "\t,CC.[" + sColumna + "]\r\n";

                string sQuery = "SELECT \r\n " + sSelect + ", '" + (Complemento ? "C" : "R") + "' AS TipoVisita " +
                                " FROM " + (Complemento ? "dbComplemento" : "dbCollection") + "..fn_Visitas(" + idCartera + ",'" + FechaInicio.ToString("yyyy-MM-dd") + "','" + FechaFin.ToString("yyyy-MM-dd") + "') Z ";

                if (!string.IsNullOrEmpty(cuentasQueryData.Query))
                    sQuery += "\tINNER JOIN ( \r\n " + cuentasQueryData.Query + "\t) CC " +
                              "\r\n\t ON Z.Cuenta = CC.idCuenta \r\n";

                return sQuery;
            }

            // --- LA FUNCIÓN GeneraQueryCuentas (Corregida y ajustada al namespace) ---
            public static SqlQueryData GeneraQueryCuentas(
                int idProducto,
                DataTable tblParámetros,
                DataTable tblAgrupar,
                CoorinWeb.Loki.Common.Resultado Conteo, // Uso explícito del namespace
                DateTime Desde,
                int idCartera,
                ref ArrayList alColumnas
            )
            {
                string sQuery = "";
                bool bConteosTels = false;

                string sSelect = "\t Z.idCuenta AS 'Cuenta' \r\n";
                string sFrom = " FROM dbCollection..Cuentas Z WITH (NOLOCK) \r\n";
                string sWhere = " WHERE Z.idCartera = " + idCartera + " AND Z.CuentaActiva = 1 \r\n";
                string sGroupBy = "Z.idCuenta, ";

                // Inicialización de las variables usadas en el bloque final 'if'
                // ¡IMPORTANTE!: Estos valores deben venir de algún lugar, no ser "hardcodeados" aquí
                // a menos que sea el comportamiento deseado por defecto.
                string telefono = "0", clase = "0", telefonica = "0", origen = "0", confirmado = "0", huso = "0", entidad = "0";
                string ultima = "0", sinConocido = "0", desconocido = "0", conocido = "0", titulares = "0";
                int hora = 0;
                string tipoHora = "";


                foreach (DataRow drFila in tblParámetros.Rows)
                {
                    string sCampo = drFila["Campo"].ToString();
                    string sOperador = drFila["Operador"].ToString();
                    string sValor = drFila["Valor"].ToString();
                    string sLogica = drFila["Logica"].ToString();
                    string sTipo = drFila["Tipo"].ToString();

                    if (!string.IsNullOrEmpty(sCampo))
                    {
                        sWhere += $" {sLogica} Z.{sCampo} {sOperador} ";
                        if (sTipo == "string" || sTipo == "varchar")
                            sWhere += $"'{sValor}'";
                        else
                            sWhere += sValor;
                        sWhere += " \r\n";
                    }
                }

                foreach (DataRow drFila in tblAgrupar.Rows)
                {
                    string Concepto = drFila["Origen"].ToString();
                    string sCampo = drFila["Campo"].ToString();

                    switch (Concepto)
                    {
                        case "Teléfonos":
                            if (!sFrom.Contains("ConteosTels"))
                            {
                                sFrom += "\t LEFT JOIN ( \r\n" +
                                        "\t\t\t\t SELECT idCuenta, idCartera, NúmeroTelefónico, idContacto, Fecha_Insert \r\n" +
                                        "\t\t\t\t FROM dbCollection..GestionesTelefónicas WITH (NOLOCK) \r\n" +
                                        "\t\t\t\t WHERE idCartera = " + idCartera + " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' \r\n" +
                                        "\t\t\t UNION ALL \r\n" +
                                        "\t\t\t\t SELECT idCuenta, idCartera, NúmeroTelefónico, idContacto, Fecha_Insert \r\n" +
                                        "\t\t\t\t FROM dbCollection..GestionesChat WITH (NOLOCK) \r\n" +
                                        "\t\t\t\t WHERE idCartera = " + idCartera + " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' \r\n" +
                                        "\t\t\t ) GT_Combined \r\n" +
                                        "\t\t\t INNER JOIN ( \r\n" +
                                        "\t\t\t\tSELECT GT.idCuenta, GT.NúmeroTelefónico, \r\n" +
                                        "\t\t\t\tSUM( CASE WHEN idContacto=1101 THEN 1 ELSE 0 END ) AS 'Titulares', \r\n" +
                                        "\t\t\t\tSUM( CASE WHEN idContacto=1102 THEN 1 ELSE 0 END ) AS 'Conocidos', \r\n" +
                                        "\t\t\t\tSUM( CASE WHEN idContacto IN (/*idsRelaciones(1103)*/'1103') THEN 1 ELSE 0 END ) AS 'Desconocidos', \r\n" +
                                        "\t\t\t\tSUM( CASE WHEN idContacto NOT IN (1101,1102, /*idsRelaciones(1103)*/'1103') THEN 1 ELSE 0 END ) AS 'SinContacto', \r\n" +
                                        "\t\t\t\tMAX(Fecha_Insert) AS 'ÚltimaMarcación' \r\n" +
                                        "\t\t\t\tFROM ( \r\n" +
                                        "\t\t\t\t  SELECT idCuenta, idCartera, NúmeroTelefónico, idContacto, Fecha_Insert \r\n" +
                                        "\t\t\t\t  FROM dbCollection..GestionesTelefónicas WITH (NOLOCK) \r\n" +
                                        "\t\t\t\t  WHERE idCartera = " + idCartera + " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' \r\n" +
                                        "\t\t\t\t  UNION ALL \r\n" +
                                        "\t\t\t\t  SELECT idCuenta, idCartera, NúmeroTelefónico, idContacto, Fecha_Insert \r\n" +
                                        "\t\t\t\t  FROM dbCollection..GestionesChat WITH (NOLOCK) \r\n" +
                                        "\t\t\t\t  WHERE idCartera = " + idCartera + " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' \r\n" +
                                        "\t\t\t\t) GT \r\n" +
                                        "\t\t\t\tWHERE GT.idCartera = " + idCartera + " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' \r\n" +
                                        "\t\t\t\tGROUP BY GT.idCuenta, GT.NúmeroTelefónico \r\n" +
                                        "\t\t\t) ConteosTels ON ConteosTels.idCuenta = Z.idCuenta AND ConteosTels.NúmeroTelefónico = Z.NúmeroTelefónico \r\n ";
                            }
                            bConteosTels = true;

                            if (sCampo == "ÚltimaMarcación")
                            {
                                ultima = "1";
                                sSelect += "\t ,ConteosTels.ÚltimaMarcación \r\n ";
                                sGroupBy += "ConteosTels.ÚltimaMarcación, ";
                            }
                            else if (sCampo == "Municipio")
                            {
                                sSelect += "\t ,ISNULL(Z." + sCampo + ",0) AS [" + drFila["Campo"] + "] \r\n ";
                                sGroupBy += "ISNULL(Z." + sCampo + ",0), \r\n ";
                            }
                            else
                            {
                                if (sCampo == "SinContacto") sinConocido = "1";
                                if (sCampo == "Desconocidos") desconocido = "1";
                                if (sCampo == "Conocidos") conocido = "1";
                                if (sCampo == "Titulares") titulares = "1";
                                sSelect += "\t ,ISNULL(ConteosTels." + sCampo + ",0) AS [" + drFila["Campo"] + "] \r\n ";
                                sGroupBy += "ISNULL(ConteosTels." + sCampo + ",0), \r\n ";
                            }
                            break;

                        case "Gestiones":
                            if (sCampo == "Usuario")
                            {
                                if (!sFrom.Contains("Ejecutivos E "))
                                    sFrom += "\t INNER JOIN dbCollection..Ejecutivos E WITH (NOLOCK) ON Z.idEjecutivo = E.idEjecutivo \r\n";
                                sSelect += "\t ,E.Usuario \r\n ";
                                sGroupBy += "E.Usuario, ";
                            }
                            else if (sCampo == "Teléfono")
                            {
                                sSelect += "\t ,Z.NúmeroTelefónico \r\n ";
                                if (Conteo == CoorinWeb.Loki.Common.Resultado.Detalle) // Uso explícito del namespace
                                    sSelect += "\t ,CA.NombreDeudor AS 'Nombre' ";
                                sGroupBy += "Z.NúmeroTelefónico, ";
                            }
                            else if (sCampo == "Extensión")
                            {
                                sSelect += "\t ,Z.Extensión \r\n ";
                                sGroupBy += "Z.Extensión, ";
                            }
                            else if (sCampo == "Fecha")
                            {
                                sSelect += "\t ,Z.Fecha_Insert AS Fecha \r\n ";
                                sGroupBy += "Z.Fecha_Insert, ";
                            }
                            else if (sCampo == "Hora")
                            {
                                sSelect += "\t ,Z.Segundo_Insert AS Hora \r\n ";
                                sGroupBy += "Z.Segundo_Insert, ";
                            }
                            else if (sCampo == "Duración" || sCampo == "TiempoEnCuenta")
                            {
                                sSelect += "\t ,Z." + sCampo + " \r\n ";
                                sGroupBy += "Z." + sCampo + ", ";
                            }
                            else if (sCampo == "Comentario" || sCampo == "NombreContacto")
                            {
                                sSelect += "\t ,Z." + sCampo + " \r\n ";
                                sGroupBy += "Z." + sCampo + ", ";
                            }
                            else
                            {
                                sSelect += "\t ," + sCampo + ".Valor AS '" + sCampo + "' \r\n ";
                                sFrom += "\t LEFT JOIN dbCollection..ValoresCatálogo " + sCampo + " ON Z.id" + sCampo + " = " + sCampo + ".idValor \r\n";
                                sGroupBy += sCampo + ".Valor, ";
                            }
                            break;

                        case "Negociaciones":
                            if (sCampo == "Usuario" || sCampo == "Validador")
                            {
                                string sAlias = sCampo.Substring(0, 1);
                                if (!sFrom.Contains("Ejecutivos " + sAlias))
                                    sFrom += "\t INNER JOIN dbCollection..Ejecutivos " + sAlias + " WITH (NOLOCK) ON Z.idEjecutivo" + (sAlias == "V" ? "Validador" : "") + " = " + sAlias + ".idEjecutivo \r\n";
                                sSelect += "\t ," + sAlias + ".Usuario AS '" + sCampo + "' \r\n ";
                                sGroupBy += "" + sAlias + ".Usuario, ";
                            }
                            else if (sCampo == "Estado")
                            {
                                sSelect += "\t ,Estado.Valor AS 'Estado' \r\n ";
                                sFrom += "\t INNER JOIN dbCollection..ValoresCatálogo Estado ON Z.idEstado = Estado.idValor \r\n";
                                sGroupBy += "Estado.Valor, ";
                            }
                            else if (sCampo == "Herramienta")
                            {
                                sSelect += "\t ,H.Nombre AS 'Herramienta' \r\n ";
                                sFrom += "\t INNER JOIN dbCollection..Herramientas H ON Z.idHerramienta = H.idHerramienta \r\n";
                                sGroupBy += "H.Nombre, ";
                            }
                            else if (sCampo == "CartaConvenio")
                            {
                                sSelect += "\t ,CASE Z." + sCampo + " WHEN 1 THEN 'Sí' ELSE 'No' END AS '" + sCampo + "' \r\n ";
                                sGroupBy += "Z." + sCampo + ", ";
                            }
                            else if (sCampo == "Fecha_Plazo")
                            {
                                sSelect += "\t ,L.FechaPago AS 'Fecha_Plazo' \r\n ";

                                if (Conteo == CoorinWeb.Loki.Common.Resultado.Detalle) // Uso explícito del namespace
                                {
                                    sSelect += "\t ,L.MontoPago AS 'Monto_Plazo' \r\n ";
                                    sSelect += "\t ,CONVERT(TINYINT,L.Cumplido) AS 'Cumplido_Plazo' \r\n ";
                                    sSelect += "\t ,L.SumaPagos AS 'Pagos_Plazo' \r\n ";
                                    sSelect += "\t ,L.Ordinal AS 'Ordinal_Plazo'  \r\n ";
                                }
                                else
                                {
                                    sSelect += "\t ,SUM(L.MontoPago) AS 'Montos_Plazo' \r\n ";
                                    sSelect += "\t ,SUM(L.SumaPagos) AS 'Pagos_Plazo' \r\n ";
                                }

                                if (!sFrom.Contains("..Plazos L "))
                                    sFrom += "\t INNER JOIN dbCollection..Plazos L WITH (NOLOCK) ON Z.idCartera = L.idCartera AND Z.idCuenta = L.idCuenta AND Z.Fecha_Insert = L.Fecha_Insert AND Z.Segundo_Insert = L.Segundo_Insert \r\n";
                                sGroupBy += "L.FechaPago, ";
                            }
                            else
                            {
                                string sColumna = sCampo;
                                if (sColumna == "Hora")
                                {
                                    sColumna = "Segundo_Insert";
                                    sSelect += "\t ,Z.Segundo_Insert AS 'Hora' \r\n ";
                                }
                                else if (sColumna == "FechaCreación")
                                {
                                    sColumna = "Fecha_Insert";
                                    sSelect += "\t ,Z.Fecha_Insert AS 'FechaCreación' \r\n ";
                                }
                                else if (sColumna == "Correo")
                                {
                                    sColumna = "CorreoElectrónico";
                                    sSelect += "\t ,Z.CorreoElectrónico AS 'Correo' \r\n ";
                                }
                                else if (sColumna == "TipoNegociación" || sColumna == "Modo" || sColumna == "NúmeroTelefónico")
                                {
                                    if (sColumna == "TipoNegociación") sSelect += "\t ,Acercamiento.Valor TipoNegociación \r\n ";
                                    if (sColumna == "Modo") sSelect += "\t ,Modo.Valor Modo \r\n ";
                                    if (sColumna == "NúmeroTelefónico") sSelect += "\t ,P.NúmeroTelefónico \r\n ";

                                    if (!sFrom.Contains("vw_Plazos P"))
                                    {
                                        sFrom += "\t LEFT JOIN vw_Plazos P ON Z.idCartera = P.idCartera AND Z.idCuenta = P.idCuenta AND Z.Fecha_Insert = P.Fecha_Insert AND Z.Segundo_Insert = P.Segundo_Insert \r\n";
                                    }

                                    if (sColumna == "TipoNegociación") sFrom += "\t INNER JOIN dbCollection..ValoresCatálogo Acercamiento ON P.idAcercamiento = Acercamiento.idValor \r\n";
                                    if (sColumna == "Modo") sFrom += "\t INNER JOIN dbCollection..ValoresCatálogo Modo ON P.idModo = Modo.idValor \r\n";
                                }
                                else if (Conteo != CoorinWeb.Loki.Common.Resultado.Detalle && (sColumna == "MontoNegociado" || sColumna == "MontoPagado" || sColumna == "SaldoNegociación"))
                                    sSelect += "\t ,SUM(Z." + sColumna + ") AS '" + sColumna + "' \r\n ";
                                else
                                    sSelect += "\t ,Z." + sColumna + " \r\n ";

                                if (sColumna != "MontoNegociado" && sColumna != "MontoPagado" && sColumna != "SaldoNegociación")
                                {
                                    if (sColumna == "TipoNegociación" || sColumna == "Modo" || sColumna == "NúmeroTelefónico" || sColumna == "Folio")
                                    {
                                        if (sColumna == "TipoNegociación")
                                        {
                                            if (sGroupBy.Contains("Modo.Valor")) sGroupBy += ", Acercamiento.Valor";
                                            else sGroupBy += "Acercamiento.Valor, ";
                                        }
                                        if (sColumna == "Modo")
                                        {
                                            if (sGroupBy.Contains("Acercamiento.Valor")) sGroupBy += ", Modo.Valor";
                                            else sGroupBy += "Modo.Valor, ";
                                        }
                                        if (sColumna == "NúmeroTelefónico")
                                        {
                                            if (sGroupBy.Contains("Acercamiento.Valor")) sGroupBy += ", P.NúmeroTelefónico";
                                            else sGroupBy += " P.NúmeroTelefónico, ";
                                        }
                                        if (sColumna == "Folio")
                                        {
                                            sGroupBy += " Z.Folio, ";
                                        }
                                    }
                                    else
                                    {
                                        sGroupBy += "Z." + sColumna + ", ";
                                    }
                                }

                                if (sColumna == "Plazos" && Conteo == CoorinWeb.Loki.Common.Resultado.Detalle) // Uso explícito del namespace
                                {
                                    int iNumPlazos = 3;
                                    if (idCartera == 4 || idCartera == 1 || idCartera == 14)
                                        iNumPlazos = 100;
                                    else if (idCartera == 15)
                                        iNumPlazos = 5;
                                    for (int i = 0; i < iNumPlazos; i++)
                                        sSelect += "\t ,P.FechaPlazo" + (i + 1) + ", P.MontoPlazo" + (i + 1) + " \r\n";
                                    if (!sFrom.Contains("vw_Plazos P"))
                                    {
                                        sFrom += "\t LEFT JOIN vw_Plazos P ON Z.idCartera = P.idCartera AND Z.idCuenta = P.idCuenta AND Z.Fecha_Insert = P.Fecha_Insert AND Z.Segundo_Insert = P.Segundo_Insert \r\n";
                                    }
                                }
                            }
                            break;

                        case "Seguimientos":
                            if (sCampo == "Usuario")
                            {
                                if (!sFrom.Contains("Ejecutivos E "))
                                    sFrom += "\t INNER JOIN dbCollection..Ejecutivos E WITH (NOLOCK) ON Z.idEjecutivo = E.idEjecutivo \r\n";
                                sSelect += "\t ,E.Usuario \r\n ";
                                sGroupBy += "E.Usuario, ";
                            }
                            else if (sCampo == "Recordatorio" || sCampo == "Realizado")
                            {
                                sSelect += "\t ,CASE Z." + sCampo + " WHEN 1 THEN 'Sí' WHEN 0 THEN 'No' END AS '" + sCampo + "' \r\n ";
                                sGroupBy += "Z." + sCampo + ", ";
                            }
                            else
                            {
                                string sColumna = sCampo;
                                if (sColumna == "FechaCreación")
                                {
                                    sColumna = "Fecha_Insert";
                                    sSelect += "\t ,Z.Fecha_Insert AS 'FechaCreación' \r\n ";
                                }
                                else if (sColumna == "HoraCreación")
                                {
                                    sColumna = "Segundo_Insert";
                                    sSelect += "\t ,Z.Segundo_Insert AS 'Hora' \r\n ";
                                }
                                else if (sColumna == "HoraSeguimiento")
                                {
                                    sColumna = "SegundoSeguimiento";
                                    sSelect += "\t ,Z.SegundoSeguimiento AS 'HoraSeguimiento' \r\n ";
                                }
                                else if (sColumna == "Teléfono")
                                {
                                    sColumna = "NúmeroTelefónico";
                                    sSelect += "\t ,Z.NúmeroTelefónico AS 'Teléfono' \r\n " +
                                            "\t ,CA.NombreDeudor AS 'Deudor' \r\n ";
                                    if (!sFrom.Contains("Cuentas CA"))
                                        sFrom += " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON Z.idCartera = CA.idCartera AND Z.idCuenta = CA.idCuenta AND CA.CuentaActiva = 1 \r\n";
                                    sGroupBy += "Z.NúmeroTelefónico, CA.NombreDeudor, ";
                                }
                                else
                                    sSelect += "\t ,Z." + sColumna + " \r\n ";

                                sGroupBy += "Z." + sColumna + ", ";
                            }

                            if (sCampo == "Realizado" && Conteo == CoorinWeb.Loki.Common.Resultado.Detalle) // Uso explícito del namespace
                            {
                                sFrom += "\tLEFT JOIN dbCollection..Ejecutivos R ON Z.idEjecutivoRealizado = R.idEjecutivo \r\n";
                                sSelect += "\t ,R.Usuario AS 'UsuarioRealizó' \r\n";
                                sSelect += "\t ,Z.SegundoRealizado AS 'HoraRealizado' \r\n";
                            }
                            break;

                        case "Chats":
                            if (sCampo == "Usuario")
                            {
                                if (!sFrom.Contains("Ejecutivos E "))
                                    sFrom += "\t INNER JOIN dbCollection..Ejecutivos E WITH (NOLOCK) ON Z.idEjecutivo = E.idEjecutivo \r\n";
                                sSelect += "\t ,E.Usuario \r\n ";
                                sGroupBy += "E.Usuario, ";
                            }
                            else if (sCampo == "Teléfono")
                            {
                                sSelect += "\t ,Z.NúmeroTelefónico \r\n " +
                                            "\t ,CA.NombreDeudor AS 'Deudor' \r\n ";
                                if (!sFrom.Contains("Cuentas CA"))
                                    sFrom += " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON Z.idCartera = CA.idCartera AND Z.idCuenta = CA.idCuenta AND CA.CuentaActiva = 1 \r\n";
                                sGroupBy += "Z.NúmeroTelefónico, CA.NombreDeudor, ";
                            }
                            else if (sCampo == "Fecha")
                            {
                                sSelect += "\t ,Z.Fecha_Insert AS Fecha \r\n ";
                                sGroupBy += "Z.Fecha_Insert, ";
                            }
                            else if (sCampo == "Hora")
                            {
                                sSelect += "\t ,Z.Segundo_Insert AS Hora \r\n ";
                                sGroupBy += "Z.Segundo_Insert, ";
                            }
                            else if (sCampo == "Duración")
                            {
                                sSelect += "\t ,Z.Duración \r\n ";
                                sGroupBy += "Z.Duración, ";
                            }
                            else if (sCampo == "Comentario")
                            {
                                sSelect += "\t ,Z.Comentario \r\n ";
                                sGroupBy += "Z.Comentario, ";
                            }
                            else if (sCampo == "Salida")
                            {
                                sSelect += "\t ,CASE Z." + sCampo + " WHEN 1 THEN 'Sí' ELSE 'No' END AS '" + sCampo + "' \r\n ";
                                sGroupBy += "Z." + sCampo + ", ";
                            }
                            else
                            {
                                sSelect += "\t ," + sCampo + ".Valor AS '" + sCampo + "' \r\n ";
                                sFrom += "\t LEFT JOIN dbCollection..ValoresCatálogo " + sCampo + " ON Z.id" + sCampo + " = " + sCampo + ".idValor \r\n";
                                sGroupBy += sCampo + ".Valor, ";
                            }
                            break;
                    }

                    if (!alColumnas.Contains(drFila["Campo"].ToString()) &&
                        !sCampo.Contains("MontoNegociado") && !sCampo.Contains("MontoPagado") && !sCampo.Contains("SaldoNegociación") &&
                        sCampo != "ÚltimaMarcación" && sCampo != "Titulares" && sCampo != "Conocidos" && sCampo != "Desconocidos" && sCampo != "SinContacto")
                    {
                        alColumnas.Add(drFila["Campo"].ToString());
                    }
                }

                if (sGroupBy.Length == 0 || Conteo == CoorinWeb.Loki.Common.Resultado.Detalle) // Uso explícito del namespace
                    sGroupBy = "";
                else
                    sGroupBy = " GROUP BY " + sGroupBy.TrimEnd(new char[] { ',', ' ' });

                if (Conteo == CoorinWeb.Loki.Common.Resultado.FilaDeTrabajo) // Uso explícito del namespace
                {
                    sSelect = "\t Z.idCartera, Z.idCuenta, Z.idEjecutivo " + (tblAgrupar.Rows.Cast<DataRow>().Any(dr => dr["Origen"].ToString() == "Negociaciones") ? ", NULL AS [NúmeroTelefónico] \r\n" : ", Z.NúmeroTelefónico \r\n");
                    sGroupBy = "";
                }

                int ejecutivoJerarquia = 99; // Este valor debería ser dinámico, no hardcodeado.

                if (Conteo == CoorinWeb.Loki.Common.Resultado.Detalle && ejecutivoJerarquia < 3) // Uso explícito del namespace
                    if (idCartera == 1)
                        sSelect = sSelect.Replace("Z.idCuenta AS 'Cuenta'", "STUFF(STUFF(Z.idCuenta,1,2,'XX'),13, 2,'XX') [Cuenta]");
                    else
                        sSelect = sSelect.Replace("Z.idCuenta AS 'Cuenta'", "STUFF(Z.idCuenta,1,LEN(Z.idCuenta)-4,'XXX-XXX-') [Cuenta]");

                sQuery = "SELECT \r\n " + sSelect + sFrom + sWhere + sGroupBy;

                if (idCartera == 1 && telefono == "1" && clase == "1" && telefonica == "1" && origen == "1" && confirmado == "1" && huso == "1" && entidad == "1" && ultima == "1" && sinConocido == "1" && desconocido == "1" && conocido == "1" && titulares == "1")
                {
                    if (hora >= 7 && hora < 9 && tipoHora == "a. m.")
                    {
                        sQuery += " and Z.HusoHorario=0 and Z.idTelefonía <>2104 and Z.idTelefonía<>2105 and Z.idTelefonía<>2106";
                    }
                }

                if (idCartera == 24 && sQuery.Contains("Intentos_ViciDial"))
                    sQuery = sQuery.Replace("FROM Intentos_ViciDial", "FROM dbHistory.CFE.Intentos_ViciDial");

                return new SqlQueryData(sQuery, alColumnas); // Se devuelve el objeto completo
            }

            public static string QueryAccionamientos(int idCartera, int idConsulta, Resultado Conteo, DateTime Desde, DateTime Hasta, string Base, int iIdAcercamiento)
            {
                ArrayList alColumnas = new ArrayList();
                string sFiltroAccionamiento = "";
                string sQueryContarComplemento = "";
                string sQuery = "",
                       sSelect = "SELECT \r\n",
                       sColumnas = "";

                CoorinWeb.Loki.Global.AccionamientosQueryHelper.SqlQueryData cuentasQueryData = QueryCuentas(idConsulta, ref alColumnas);
                string sQueryCuentas = cuentasQueryData.SqlQueryText; // <<-- Esto requiere la propiedad SqlQueryText
                string sGroupBy = "";

                // Columnas de la consulta de cuentas.
                foreach (string sColumna in alColumnas)
                    sColumnas += "\tCC.[" + sColumna + "],\r\n";

                sSelect = sSelect + sColumnas.Replace("CC.", "") +
                                "\tCOUNT( DISTINCT AC.idCuenta) AS " + (Conteo == Resultado.ContarCuentas ? "Cuentas" : "Accionamientos") + ",\r\n" +
                                "\tSUM(CASE WHEN AC.idAcercamiento = 1604 THEN 1 ELSE 0 END) Carta,\r\n" +
                                "\tSUM(CASE WHEN AC.idAcercamiento = 1605 THEN 1 ELSE 0 END) Blaster,\r\n" +
                                "\tSUM(CASE WHEN AC.idAcercamiento = 1606 THEN 1 ELSE 0 END) SMS,\r\n" +
                                "\tSUM(CASE WHEN AC.idAcercamiento = 1607 THEN 1 ELSE 0 END) Mail,\r\n" +
                                "\tSUM(CASE WHEN AC.idAcercamiento = 1609 THEN 1 ELSE 0 END) Whatsapp,\r\n" +
                                "\tSUM(CASE WHEN AC.idAcercamiento = 1608 THEN 1 ELSE 0 END) Telegrama\r\n";

                // Accionamientos
                if (Base == "dbComplemento..")
                {
                    sQuery = sSelect + "FROM (\r\n" +
                            "   SELECT \r\n" +
                            "       DISTINCT \r\n" +
                            sColumnas + "\r\n" +
                            "       idAcercamiento, \r\n" +
                            "       A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta \r\n" +
                            "   FROM dbComplemento..Accionamientos A \r\n"
                            ;
                }
                else
                {
                    sQuery = sSelect + "FROM (\r\n" +
                            "   SELECT \r\n" +
                            "       DISTINCT \r\n" +
                            sColumnas + "\r\n" +
                            "       idAcercamiento, \r\n" +
                            "       A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta \r\n" +
                            "   FROM dbCollection..Accionamientos A \r\n"
                            ;
                }

                if (sQueryCuentas != "")
                    sQuery += "\tINNER JOIN ( \r\n " + sQueryCuentas + "\t) CC " +
                              "\r\n\t ON A.idCuenta  = CC.idCuenta \r\n";

                sQuery += "WHERE Fecha_Insert BETWEEN '" + Desde.ToString("yyyy-MM-dd") + "' AND '" + Hasta.ToString("yyyy-MM-dd") + "' AND A.idCartera = " + idCartera + "\r\n" +
                          "\r\n\tUNION ALL\r\n\r\n";


                // Correos
                sQuery +=
                    "   SELECT \r\n" +
                    "       DISTINCT \r\n" +
                    sColumnas + "\r\n" +
                    "       1607 idAcercamiento, \r\n" +
                    "       A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta\r\n" +
                    "   FROM CorreosEnviados A \r\n"
                    ;

                if (sQueryCuentas != "")
                    sQuery += "\tINNER JOIN ( \r\n " + sQueryCuentas + "\t) CC " +
                              "\r\n\t ON A.idCuenta COLLATE DATABASE_DEFAULT = CC.idCuenta COLLATE DATABASE_DEFAULT \r\n";

                sQuery += "WHERE Fecha_Insert BETWEEN '" + Desde.ToString("yyyy-MM-dd") + "' AND '" + Hasta.ToString("yyyy-MM-dd") + "' AND A.idCartera = " + idCartera + "\r\n";

                // Group by
                foreach (string sColumna in alColumnas)
                    sGroupBy += "[" + sColumna + "],";

                if (sGroupBy.Length > 0)
                    sGroupBy = "GROUP BY " + sGroupBy.TrimEnd(',');

                // Query
                if (Conteo != Resultado.ContarCuentas)
                    sQuery = sQuery.Replace(" DISTINCT ", " ");

                if (Base == "dbComplemento.." && idConsulta != 0)
                {
                    int J = 0;
                    sSelect = "";
                    foreach (string sColumna in alColumnas)
                    {
                        if (J == 0)
                        {
                            sSelect += "\t CC.[" + sColumna + "],\r\n";
                        }
                        else
                        {
                            sSelect += "\t CC.[" + sColumna + "],\r\n";
                        }
                        J++;
                    }
                    sQueryContarComplemento = " UNION ALL SELECT " + sSelect + "idAcercamiento,  A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta FROM dbComplemento..Accionamientos A " +
                                              "\tINNER JOIN ( \r\n " + sQueryCuentas + "\t) CC " +
                                              "\r\n\t ON A.idCuenta COLLATE DATABASE_DEFAULT = CC.idCuenta COLLATE DATABASE_DEFAULT \r\n" +
                                              "WHERE Fecha_Insert BETWEEN '" + Desde.ToString("yyyy-MM-dd") + "' AND '" + Hasta.ToString("yyyy-MM-dd") + "' AND A.idCartera = " + idCartera + "\r\n";
                }

                sQuery = sQuery + sQueryContarComplemento + " \r\n) AC \r\n" + sGroupBy;

                if (iIdAcercamiento != 0)
                    sFiltroAccionamiento += "AND X.idAcercamiento = " + iIdAcercamiento;

                //Excel 2.1
                if (Resultado.Detalle == Conteo)
                {
                    sSelect = "";
                    if (iIdAcercamiento == 1606 && idCartera == 1)
                    {
                        foreach (string sColumna in alColumnas)
                            sSelect += "\t,CC.[" + sColumna + "]\r\n";
                        sQuery = "SELECT X.Fecha, X.Hora, E.NombreEjecutivo [Cargó], Carteras.Abreviación + CONVERT(VARCHAR(20), CA.Expediente) + '" + "ServerLetterPlaceholder" + "' [Expediente], Acercamiento.Valor Acercamiento, X.Nombre, X.Mensaje, X.Destino, X.Resultados" + sSelect + " \r\n" +
                                 "FROM ( \r\n" +
                                 "   SELECT A.idCartera, A.Fecha_Insert Fecha, A.Segundo_Insert Hora, P.idEjecutivo_Insert Ejecutivo, A.idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                 "       P.Descripción, A.Mensaje, CONVERT(VARCHAR(20), A.NúmeroTelefónico) Destino, Resultados \r\n" +
                                 "   FROM dbCollection..Accionamientos A \r\n" +
                                 "       LEFT JOIN dbCollection..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n" +
                                 "   UNION ALL \r\n" +
                                 "   SELECT A.idCartera, A.Fecha_Insert Fecha, A.Segundo_Insert Hora, A.idEjecutivo_Insert Ejecutivo, 1607 idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                 "       P.Descripción, A.Mensaje, A.CorreoElectrónico Destino, Resultados \r\n" +
                                 "   FROM CorreosEnviados A \r\n" +
                                 "   LEFT JOIN dbCollection..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n " +
                                 " ) X \r\n " +
                                 " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON X.idCartera = CA.idCartera AND X.idCuenta = CA.idCuenta \r\n " +
                                 " INNER JOIN dbCollection..Carteras WITH (NOLOCK) ON X.idCartera = Carteras.idCartera " +
                                 "LEFT JOIN Ejecutivos E ON X.Ejecutivo=E.idEjecutivo \r\n" +
                                 "LEFT JOIN ValoresCatálogo Acercamiento ON X.idAcercamiento = Acercamiento.idValor \r\n"
                                 ;

                        if (sQueryCuentas != "")
                            sQuery += "\tINNER JOIN ( \r\n " + sQueryCuentas + "\t) CC " +
                                      "\r\n\t ON X.idCuenta = CC.idCuenta \r\n";

                        sQuery += "WHERE X.Fecha BETWEEN '" + Desde.ToString("yyyy-MM-dd") + "' AND '" + Hasta.ToString("yyyy-MM-dd") + "' AND X.idCartera = " + idCartera + " " + sFiltroAccionamiento + "\r\n";

                        if (Base == "dbComplemento..")
                        {
                            sQuery += "UNION ALL \r\n SELECT X.Fecha, X.Hora, E.NombreEjecutivo [Cargó], Carteras.Abreviación + CONVERT(VARCHAR(20), CA.Expediente) + '" + "ServerLetterPlaceholder" + "' [Expediente], Acercamiento.Valor Acercamiento, X.Nombre, X.Mensaje, X.Destino, X.Resultados" + sSelect + " \r\n" +
                                      "FROM ( \r\n" +
                                      "   SELECT A.idCartera, A.Fecha_Insert Fecha, A.Segundo_Insert Hora, P.idEjecutivo_Insert Ejecutivo, A.idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                      "       P.Descripción, A.Mensaje, CONVERT(VARCHAR(20), A.NúmeroTelefónico) Destino, Resultados \r\n" +
                                      "   FROM dbComplemento..Accionamientos A \r\n" +
                                      "       LEFT JOIN dbComplemento..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n" +
                                      "   UNION ALL \r\n" +
                                      "   SELECT A.idCartera, A.Fecha_Insert Fecha, A.Segundo_Insert Hora, A.idEjecutivo_Insert Ejecutivo, 1607 idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                      "       P.Descripción, A.Mensaje, A.CorreoElectrónico Destino, Resultados \r\n" +
                                      "   FROM CorreosEnviados A \r\n" +
                                      "   LEFT JOIN dbComplemento..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n " +
                                      " ) X \r\n " +
                                      " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON X.idCartera = CA.idCartera AND X.idCuenta = CA.idCuenta \r\n " +
                                      " INNER JOIN dbCollection..Carteras WITH (NOLOCK) ON X.idCartera = Carteras.idCartera " +
                                      "LEFT JOIN Ejecutivos E ON X.Ejecutivo=E.idEjecutivo \r\n" +
                                      "LEFT JOIN ValoresCatálogo Acercamiento ON X.idAcercamiento = Acercamiento.idValor \r\n"
                                      ;

                            if (sQueryCuentas != "")
                                sQuery += "\tINNER JOIN ( \r\n " + sQueryCuentas + "\t) CC " +
                                          "\r\n\t ON X.idCuenta = CC.idCuenta \r\n";

                            sQuery += "WHERE X.Fecha BETWEEN '" + Desde.ToString("yyyy-MM-dd") + "' AND '" + Hasta.ToString("yyyy-MM-dd") + "' AND X.idCartera = " + idCartera + " " + sFiltroAccionamiento + "\r\n";

                        }
                    }
                    else if (iIdAcercamiento == 1607 && idCartera == 1)
                    {
                        foreach (string sColumna in alColumnas)
                            sSelect += "\t,CC.[" + sColumna + "]\r\n";
                        sQuery = "SELECT X.Fecha, X.Hora, E.NombreEjecutivo [Cargó], Carteras.Abreviación + CONVERT(VARCHAR(20), CA.Expediente) + '" + "ServerLetterPlaceholder" + "' [Expediente], Acercamiento.Valor Acercamiento, X.Nombre, X.Mensaje, X.Destino, TipoMensaje.Valor TipoMensaje, X.Resultados" + sSelect + " \r\n" +
                                 "FROM ( \r\n" +
                                 "   SELECT A.idCartera, A.Fecha_Insert Fecha, A.Segundo_Insert Hora, P.idEjecutivo_Insert Ejecutivo, A.idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                 "       P.Descripción, A.Mensaje, CONVERT(VARCHAR(20), A.NúmeroTelefónico) Destino, IdTipomensaje, Resultados \r\n" +
                                 "   FROM dbCollection..Accionamientos A \r\n" +
                                 "       LEFT JOIN dbCollection..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n" +
                                 "   UNION ALL \r\n" +
                                 "   SELECT A.idCartera, A.Fecha_Insert Fecha, A.Segundo_Insert Hora, A.idEjecutivo_Insert Ejecutivo, 1607 idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                 "       P.Descripción, A.Mensaje, A.CorreoElectrónico Destino, IdTipomensaje, Resultados \r\n" +
                                 "   FROM CorreosEnviados A \r\n" +
                                 "   LEFT JOIN dbCollection..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n " +
                                 " ) X \r\n " +
                                 " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON X.idCartera = CA.idCartera AND X.idCuenta = CA.idCuenta \r\n " +
                                 " INNER JOIN dbCollection..Carteras WITH (NOLOCK) ON X.idCartera = Carteras.idCartera " +
                                 " LEFT JOIN Ejecutivos E ON X.Ejecutivo=E.idEjecutivo \r\n" +
                                 " LEFT JOIN ValoresCatálogo Acercamiento ON X.idAcercamiento = Acercamiento.idValor" +
                                 " LEFT JOIN ValoresCatálogo TipoMensaje ON X.IdTipomensaje = TipoMensaje.idValor \r\n"
                                 ;

                        if (sQueryCuentas != "")
                            sQuery += "\tINNER JOIN ( \r\n " + sQueryCuentas + "\t) CC " +
                                      "\r\n\t ON X.idCuenta = CC.idCuenta \r\n";

                        sQuery += "WHERE X.Fecha BETWEEN '" + Desde.ToString("yyyy-MM-dd") + "' AND '" + Hasta.ToString("yyyy-MM-dd") + "' AND X.idCartera = " + idCartera + " " + sFiltroAccionamiento + "\r\n";

                        if (Base == "dbComplemento..")
                        {
                            sQuery += "UNION ALL \r\n SELECT X.Fecha, X.Hora, E.NombreEjecutivo [Cargó], Carteras.Abreviación + CONVERT(VARCHAR(20), CA.Expediente) + '" + "ServerLetterPlaceholder" + "' [Expediente], Acercamiento.Valor Acercamiento, X.Nombre, X.Mensaje, X.Destino, TipoMensaje.Valor TipoMensaje, X.Resultados" + sSelect + " \r\n" +
                                      "FROM ( \r\n" +
                                      "   SELECT A.idCartera, A.Fecha_Insert Fecha, A.Segundo_Insert Hora, P.idEjecutivo_Insert Ejecutivo, A.idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                      "       P.Descripción, A.Mensaje, CONVERT(VARCHAR(20), A.NúmeroTelefónico) Destino, IdTipomensaje, Resultados \r\n" +
                                      "   FROM dbComplemento..Accionamientos A \r\n" +
                                      "       LEFT JOIN dbComplemento..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n" +
                                      "   UNION ALL \r\n" +
                                      "   SELECT A.idCartera, A.Fecha_Insert Fecha, A.Segundo_Insert Hora, A.idEjecutivo_Insert Ejecutivo, 1607 idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                      "       P.Descripción, A.Mensaje, A.CorreoElectrónico Destino, IdTipomensaje, Resultados \r\n" +
                                      "   FROM CorreosEnviados A \r\n" +
                                      "   LEFT JOIN dbComplemento..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n " +
                                      " ) X \r\n " +
                                      " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON X.idCartera = CA.idCartera AND X.idCuenta = CA.idCuenta \r\n " +
                                      " INNER JOIN dbCollection..Carteras WITH (NOLOCK) ON X.idCartera = Carteras.idCartera " +
                                      "LEFT JOIN Ejecutivos E ON X.Ejecutivo=E.idEjecutivo \r\n" +
                                      "LEFT JOIN ValoresCatálogo Acercamiento ON X.idAcercamiento = Acercamiento.idValor " +
                                      "LEFT JOIN ValoresCatálogo TipoMensaje ON X.IdTipomensaje = TipoMensaje.idValor\r\n"
                                      ;

                            if (sQueryCuentas != "")
                                sQuery += "\tINNER JOIN ( \r\n " + sQueryCuentas + "\t) CC " +
                                          "\r\n\t ON X.idCuenta = CC.idCuenta \r\n";

                            sQuery += "WHERE X.Fecha BETWEEN '" + Desde.ToString("yyyy-MM-dd") + "' AND '" + Hasta.ToString("yyyy-MM-dd") + "' AND X.idCartera = " + idCartera + " " + sFiltroAccionamiento + "\r\n";

                        }
                    }
                    else
                    {
                        foreach (string sColumna in alColumnas)
                            sSelect += "\t,CC.[" + sColumna + "]\r\n";
                        sQuery = "SELECT X.Fecha, E.NombreEjecutivo [Cargó], Carteras.Abreviación + CONVERT(VARCHAR(20), CA.Expediente) + '" + "ServerLetterPlaceholder" + "' [Expediente], Acercamiento.Valor Acercamiento, X.Nombre, X.Mensaje, X.Destino, TipoMensaje.Valor TipoMensaje, X.Resultados" + sSelect + " \r\n" +
                                 "FROM ( \r\n" +
                                 "   SELECT A.idCartera, A.Fecha_Insert Fecha, P.idEjecutivo_Insert Ejecutivo, A.idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                 "       P.Descripción, A.Mensaje, CONVERT(VARCHAR(20), A.NúmeroTelefónico) Destino, IdTipomensaje, Resultados \r\n" +
                                 "   FROM dbCollection..Accionamientos A \r\n" +
                                 "       LEFT JOIN dbCollection..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n" +
                                 "   UNION ALL \r\n" +
                                 "   SELECT A.idCartera, A.Fecha_Insert Fecha, A.idEjecutivo_Insert Ejecutivo, 1607 idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                 "       P.Descripción, A.Mensaje, A.CorreoElectrónico Destino, IdTipomensaje, Resultados \r\n" +
                                 "   FROM CorreosEnviados A \r\n" +
                                 "   LEFT JOIN dbCollection..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n " +
                                 " ) X \r\n " +
                                 " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON X.idCartera = CA.idCartera AND X.idCuenta = CA.idCuenta \r\n " +
                                 " INNER JOIN dbCollection..Carteras WITH (NOLOCK) ON X.idCartera = Carteras.idCartera " +
                                 " LEFT JOIN Ejecutivos E ON X.Ejecutivo=E.idEjecutivo \r\n" +
                                 " LEFT JOIN ValoresCatálogo Acercamiento ON X.idAcercamiento = Acercamiento.idValor" +
                                 " LEFT JOIN ValoresCatálogo TipoMensaje ON X.IdTipomensaje = TipoMensaje.idValor \r\n"
                                 ;

                        if (sQueryCuentas != "")
                            sQuery += "\tINNER JOIN ( \r\n " + sQueryCuentas + "\t) CC " +
                                      "\r\n\t ON X.idCuenta = CC.idCuenta \r\n";

                        sQuery += "WHERE X.Fecha BETWEEN '" + Desde.ToString("yyyy-MM-dd") + "' AND '" + Hasta.ToString("yyyy-MM-dd") + "' AND X.idCartera = " + idCartera + " " + sFiltroAccionamiento + "\r\n";

                        if (Base == "dbComplemento..")
                        {
                            sQuery += "UNION ALL \r\n SELECT X.Fecha, E.NombreEjecutivo [Cargó], Carteras.Abreviación + CONVERT(VARCHAR(20), CA.Expediente) + '" + "ServerLetterPlaceholder" + "' [Expediente], Acercamiento.Valor Acercamiento, X.Nombre, X.Mensaje, X.Destino, TipoMensaje.Valor TipoMensaje, X.Resultados" + sSelect + " \r\n" +
                                      "FROM ( \r\n" +
                                      "   SELECT A.idCartera, A.Fecha_Insert Fecha, P.idEjecutivo_Insert Ejecutivo, A.idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                      "       P.Descripción, A.Mensaje, CONVERT(VARCHAR(20), A.NúmeroTelefónico) Destino, IdTipomensaje, Resultados\r\n" +
                                      "   FROM dbComplemento..Accionamientos A \r\n" +
                                      "       LEFT JOIN dbComplemento..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n" +
                                      "   UNION ALL \r\n" +
                                      "   SELECT A.idCartera, A.Fecha_Insert Fecha, A.idEjecutivo_Insert Ejecutivo, 1607 idAcercamiento, A.idCuenta COLLATE DATABASE_DEFAULT AS idCuenta, P.Nombre, \r\n" +
                                      "       P.Descripción, A.Mensaje, A.CorreoElectrónico Destino, IdTipomensaje, Resultados\r\n" +
                                      "   FROM CorreosEnviados A \r\n" +
                                      "   LEFT JOIN dbComplemento..Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert \r\n " +
                                      " ) X \r\n " +
                                      " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON X.idCartera = CA.idCartera AND X.idCuenta = CA.idCuenta \r\n " +
                                      " INNER JOIN dbCollection..Carteras WITH (NOLOCK) ON X.idCartera = Carteras.idCartera " +
                                      "LEFT JOIN Ejecutivos E ON X.Ejecutivo=E.idEjecutivo \r\n" +
                                      "LEFT JOIN ValoresCatálogo Acercamiento ON X.idAcercamiento = Acercamiento.idValor " +
                                      "LEFT JOIN ValoresCatálogo TipoMensaje ON X.IdTipomensaje = TipoMensaje.idValor\r\n"
                                      ;

                            if (sQueryCuentas != "")
                                sQuery += "\tINNER JOIN ( \r\n " + sQueryCuentas + "\t) CC " +
                                          "\r\n\t ON X.idCuenta = CC.idCuenta \r\n";

                            sQuery += "WHERE X.Fecha BETWEEN '" + Desde.ToString("yyyy-MM-dd") + "' AND '" + Hasta.ToString("yyyy-MM-dd") + "' AND X.idCartera = " + idCartera + " " + sFiltroAccionamiento + "\r\n";

                        }
                    }

                }
                // Este return siempre debe ser alcanzado.
                return sQuery + " \r\n ";
            }

            public static string QueryOfrecimientos(int idCartera, DateTime Desde, DateTime Hasta, int idConsulta)
            {

                ArrayList alColumnas = new ArrayList();
                string sSelect = "\tZ.*\r\n";
                SqlQueryData cuentasQueryData = ConsultaGenerador.QueryCuentas(idConsulta, ref alColumnas);


                // Columnas de la consulta de cuentas.
                foreach (string sColumna in alColumnas)
                    sSelect += "\t,CC.[" + sColumna + "]\r\n";

                string sQuery = "SELECT \r\n " + sSelect +
                         " FROM dbCollection.dbo.fn_Ofrecimientos('" + Desde.ToString("yyyy-MM-dd") + "','" + Hasta.ToString("yyyy-MM-dd") + "', " + idCartera + ") Z ";

                if (!string.IsNullOrEmpty(cuentasQueryData.Query))
                    sQuery += "\tINNER JOIN ( \r\n " + cuentasQueryData + "\t) CC " +
                        "\r\n\t ON Z.Cuenta = CC.idCuenta \r\n";

                return sQuery;
            }
            public static string QueryBúsquedas(int idCartera, DateTime Desde, DateTime Hasta, int idConsulta)
            {

                ArrayList alColumnas = new ArrayList();
                string sSelect = "\tZ.*\r\n";
                SqlQueryData cuentasQueryData = ConsultaGenerador.QueryCuentas(idConsulta, ref alColumnas);


                // Columnas de la consulta de cuentas.
                foreach (string sColumna in alColumnas)
                    sSelect += "\t,CC.[" + sColumna + "]\r\n";

                string sQuery = "SELECT \r\n " + sSelect +
                         " FROM dbCollection.dbo.fn_BúsquedasPeriodo('" + Desde.ToString("yyyy-MM-dd") + "','" + Hasta.ToString("yyyy-MM-dd") + "', " + idCartera + ") Z ";

                if (!string.IsNullOrEmpty(cuentasQueryData.Query))
                    sQuery += "\tINNER JOIN ( \r\n " + cuentasQueryData + "\t) CC " +
                        "\r\n\t ON Z.Cuenta = CC.idCuenta \r\n";

                return sQuery;
            }

            public static string QueryComentarios(int idCartera, DateTime Desde, DateTime Hasta, int idConsulta)
            {

                ArrayList alColumnas = new ArrayList();
                string sSelect = "\tZ.*\r\n";
                SqlQueryData cuentasQueryData = ConsultaGenerador.QueryCuentas(idConsulta, ref alColumnas);

                // Columnas de la consulta de cuentas.
                foreach (string sColumna in alColumnas)
                    sSelect += "\t,CC.[" + sColumna + "]\r\n";

                string sQuery = "SELECT \r\n " + sSelect +
                        " FROM dbCollection.dbo.fn_Comentarios('" + Desde.ToString("yyyy-MM-dd") + "','" + Hasta.ToString("yyyy-MM-dd") + "', " + idCartera + ") Z ";

                if (!string.IsNullOrEmpty(cuentasQueryData.Query))
                    sQuery += "\tINNER JOIN ( \r\n " + cuentasQueryData + "\t) CC " +
                        "\r\n\t ON Z.Cuenta = CC.idCuenta \r\n";

                return sQuery;
            }

            public static string QueryCarteoDevuelto(int idCartera, DateTime Desde, DateTime Hasta, int idConsulta)
            {

                ArrayList alColumnas = new ArrayList();
                string sSelect = "\tZ.*\r\n";
                SqlQueryData cuentasQueryData = ConsultaGenerador.QueryCuentas(idConsulta, ref alColumnas);


                // Columnas de la consulta de cuentas.
                foreach (string sColumna in alColumnas)
                    sSelect += "\t,CC.[" + sColumna + "]\r\n";

                string sQuery = "SELECT \r\n " + sSelect +
                         " FROM dbCollection.dbo.fn_CarteoDevuelto('" + Desde.ToString("yyyy-MM-dd") + "','" + Hasta.ToString("yyyy-MM-dd") + "', " + idCartera + ") Z ";

                if (!string.IsNullOrEmpty(cuentasQueryData.Query))
                    sQuery += "\tINNER JOIN ( \r\n " + cuentasQueryData + "\t) CC " +
                        "\r\n\t ON Z.Cuenta = CC.idCuenta \r\n";

                return sQuery;
            }

            public static string QueryVGP(int idCartera, DateTime Desde, DateTime Hasta, int idConsulta)
            {

                ArrayList alColumnas = new ArrayList();
                string sSelect = "\tZ.*\r\n";
                SqlQueryData cuentasQueryData = ConsultaGenerador.QueryCuentas(idConsulta, ref alColumnas);

                // Columnas de la consulta de cuentas.
                foreach (string sColumna in alColumnas)
                    sSelect += "\t,CC.[" + sColumna + "]\r\n";

                string sQuery = "SELECT \r\n " + sSelect +
                        " FROM dbHistory.dbo.fn_ConsultaVGP('" + Desde.ToString("yyyy-MM-dd") + "','" + Hasta.ToString("yyyy-MM-dd") + "', " + idCartera + ") Z ";

                if (!string.IsNullOrEmpty(cuentasQueryData.Query))
                    sQuery += "\tINNER JOIN ( \r\n " + cuentasQueryData + "\t) CC " +
                        "\r\n\t ON Z.Cuenta = CC.idCuenta \r\n";

                return sQuery;
            }

            public static class ReportePagos
            {
                public static string QueryPagosReportados(int idCartera, DateTime Desde, DateTime Hasta, int idConsulta)
                {
                    ArrayList alColumnas = new ArrayList();
                    string sQueryReportePagos = "";
                    string sSelect = "\tZ.*\r\n";

                    CoorinWeb.Loki.Global.AccionamientosQueryHelper.SqlQueryData cuentasQueryDataObject =
                        CoorinWeb.Loki.Global.AccionamientosQueryHelper.ConsultaGenerador.QueryCuentas(idConsulta, ref alColumnas);
                    string sQueryCuentas = cuentasQueryDataObject.SqlQueryText;


                    sQueryReportePagos =
                          "SELECT   C.Cartera , " +
                          "P.idCuenta Cuenta , " +
                          "E.NombreEjecutivo ,  " +
                          "P.FechaPago [Fecha Pago] , " +
                          "P.Segundo_Insert [Hora]," +
                          "CONCAT('$ ', P.MontoPago) [Monto Pago] , " +
                          "P.Referencia,  " +
                          "P.Sucursal  " +
                          "FROM    dbo.PagosReportados P " +
                          "INNER JOIN dbo.Carteras C ON C.idCartera = P.idCartera " +
                          "INNER JOIN dbo.Ejecutivos E ON E.idEjecutivo = P.idEjecutivo " +
                          "INNER JOIN dbo.ValoresCatálogo V ON V.idValor = P.idEtapa " +
                          "WHERE   P.idCartera = " + idCartera + " AND P.FechaPago BETWEEN '" + Desde.ToString("yyyy-MM-dd") + "' AND '" + Hasta.ToString("yyyy-MM-dd") + "'";

                    // Columnas de la consulta de cuentas.
                    foreach (string sColumna in alColumnas)
                        sSelect += "\t,CC.[" + sColumna + "]\r\n";

                    string sQuery = "SELECT \r\n " + sSelect +
                                    " FROM ( " + sQueryReportePagos + ") Z ";

                    // Se usa la cadena SQL extraída.
                    if (sQueryCuentas != "")
                        sQuery += "\tINNER JOIN ( \r\n " + sQueryCuentas + "\t) CC " +
                            "\r\n\t ON Z.Cuenta = CC.idCuenta \r\n";

                    return sQuery;
                }


            }
        }
    }
}