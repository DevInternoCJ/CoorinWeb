using System;
using System.Collections;
using System.Data;
using System.Linq; // Necesario para Linq si usas .Any() o similar
using CoorinWeb.Loki.Common;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore; // Se asume que IDbContextFactory está aquí

// --- Nuevo Namespace para Enums Comunes ---
namespace CoorinWeb.Loki.Common // Un buen lugar para enums genéricos
{
    public enum Resultado
    {
        Cuentas,
        Detalle,
        FilaDeTrabajo,
        ContarCuentas,
        Contar,
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
                // Actualizar para que coincida con la estructura de la BD
                TablaParámetros = new DataTable("Parametros");
                TablaParámetros.Columns.Add("Concepto", typeof(string));
                TablaParámetros.Columns.Add("Campo", typeof(string));
                TablaParámetros.Columns.Add("Valores", typeof(string));
                TablaParámetros.Columns.Add("Parámetros", typeof(string));
                TablaParámetros.Columns.Add("Dato", typeof(string));

                // CORREGIR: Agregar la columna "Origen" que espera el método
                TablaAgrupar = new DataTable("Agrupar");
                TablaAgrupar.Columns.Add("Concepto", typeof(string));
                TablaAgrupar.Columns.Add("Campo", typeof(string));
                TablaAgrupar.Columns.Add("Origen", typeof(string)); // ← Esta es la columna faltante
            }
        }

        // Clase principal para la generación de consultas dinámicas.
        public class ConsultaGenerador
        {
            private static DataSet _Consultas = new DataSet();
            private readonly IDbContextFactory _dbContextFactory;

            public ConsultaGenerador(IDbContextFactory dbContextFactory)
            {
                _dbContextFactory = dbContextFactory;
            }
            static ConsultaGenerador()
            {
                DataTable dtConsultas = new DataTable("Consultas");
                dtConsultas.Columns.Add("idConsulta", typeof(int));
                dtConsultas.Columns.Add("idProducto", typeof(int));
                dtConsultas.Columns.Add("idCartera", typeof(int));
                dtConsultas.PrimaryKey = new DataColumn[] { dtConsultas.Columns["idConsulta"] };

                // Filas hardcodeadas por defecto
                dtConsultas.Rows.Add(1, 101, 1);
                dtConsultas.Rows.Add(2, 102, 24);

                _Consultas.Tables.Add(dtConsultas);
            }

            // Método estático async para cargar consultas desde la BD usando Dapper
            // En tu ConsultaGenerador, verifica que la conexión sea correcta
            public static async Task CargarDesdeBDAsync(IDbContextFactory dbContextFactory, string servidor)
            {
                try
                {
                    // Reiniciar el DataSet
                    _Consultas = new DataSet();

                    // NO usar using aquí - dejar que el caller maneje el ciclo de vida
                    var dbContext = dbContextFactory.GetDbContext(servidor, "Collection");
                    var conn = dbContext.Database.GetDbConnection();

                    if (conn.State != System.Data.ConnectionState.Open)
                        await conn.OpenAsync();

                    // 1. Cargar tabla Consultas
                    DataTable dtConsultas = new DataTable("Consultas");
                    dtConsultas.Columns.Add("idConsulta", typeof(int));
                    dtConsultas.Columns.Add("idProducto", typeof(int));
                    dtConsultas.Columns.Add("idCartera", typeof(int));
                    dtConsultas.Columns.Add("NombreConsulta", typeof(string)); // Agregar esta columna
                    dtConsultas.Columns.Add("Desde", typeof(DateTime)); // Agregar esta columna
                    dtConsultas.PrimaryKey = new DataColumn[] { dtConsultas.Columns["idConsulta"] };

                    var consultas = await conn.QueryAsync(
                        "SELECT idConsulta, idProducto, idCartera, NombreConsulta, Desde FROM Consultas");

                    foreach (var c in consultas)
                    {
                        dtConsultas.Rows.Add(c.idConsulta, c.idProducto, c.idCartera, c.NombreConsulta, c.Desde);
                    }
                    _Consultas.Tables.Add(dtConsultas);

                    // 2. Cargar tabla ConsultaParámetros
                    DataTable dtParametros = new DataTable("Parámetros");
                    dtParametros.Columns.Add("idConsulta", typeof(int));
                    dtParametros.Columns.Add("Concepto", typeof(string));
                    dtParametros.Columns.Add("Campo", typeof(string));
                    dtParametros.Columns.Add("Valores", typeof(string));
                    dtParametros.Columns.Add("Parámetros", typeof(string));
                    dtParametros.Columns.Add("Dato", typeof(string));

                    var parametros = await conn.QueryAsync(
                        "SELECT idConsulta, Concepto, Campo, Valores, Parámetros, Dato FROM ConsultaParámetros");

                    foreach (var p in parametros)
                    {
                        dtParametros.Rows.Add(p.idConsulta, p.Concepto, p.Campo, p.Valores, p.Parámetros, p.Dato);
                    }
                    _Consultas.Tables.Add(dtParametros);

                    // 3. Cargar tabla ConsultaAgrupar
                    DataTable dtAgrupar = new DataTable("Agrupar");
                    dtAgrupar.Columns.Add("idConsulta", typeof(int));
                    dtAgrupar.Columns.Add("Concepto", typeof(string));
                    dtAgrupar.Columns.Add("Campo", typeof(string));

                    var agrupar = await conn.QueryAsync(
                        "SELECT idConsulta, Concepto, Campo FROM ConsultaAgrupar");

                    foreach (var a in agrupar)
                    {
                        dtAgrupar.Rows.Add(a.idConsulta, a.Concepto, a.Campo);
                    }
                    _Consultas.Tables.Add(dtAgrupar);

                    // 4. Crear relaciones
                    _Consultas.Relations.Add("FK_Parámetros",
                        _Consultas.Tables["Consultas"].Columns["idConsulta"],
                        _Consultas.Tables["Parámetros"].Columns["idConsulta"], true);

                    _Consultas.Relations.Add("FK_Agrupar",
                        _Consultas.Tables["Consultas"].Columns["idConsulta"],
                        _Consultas.Tables["Agrupar"].Columns["idConsulta"], true);

                    Console.WriteLine($"Se cargaron {dtConsultas.Rows.Count} consultas, {dtParametros.Rows.Count} parámetros, {dtAgrupar.Rows.Count} agrupaciones desde la BD");

                    // Cerrar la conexión pero no disponer el contexto
                    await conn.CloseAsync();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error al cargar consultas desde BD: {ex.Message}", ex);
                }
            }

            public static DataRow? ObtenerConsulta(int idConsulta)
            {
                if (_Consultas.Tables.Count == 0) return null;
                return _Consultas.Tables["Consultas"].Rows.Find(idConsulta);
            }



            public static SqlQueryData QueryCuentas(int idConsulta, ref ArrayList Columnas)
            {
                Columnas = new ArrayList();

                DataTable tblParámetros = Ejecutivo1.TablaParámetros;
                DataTable tblAgrupar = Ejecutivo1.TablaAgrupar;

                DataRow drConsulta = _Consultas.Tables["Consultas"].Rows.Find(idConsulta);
                if (drConsulta == null || idConsulta <= 0)
                    return new SqlQueryData();

                DateTime dtDesde;
                LlenaConsulta(idConsulta, tblParámetros, tblAgrupar, out dtDesde);

                return GeneraQueryCuentas(
                    Convert.ToInt32(drConsulta["idProducto"]),
                    tblParámetros,
                    tblAgrupar,
                    Resultado.Cuentas,
                    dtDesde,
                    Convert.ToInt32(drConsulta["idCartera"]),
                    ref Columnas
                );
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
                {
                    DataRow newRow = Parámetros.NewRow();
                    newRow["Concepto"] = drParámetros[i]["Concepto"];
                    newRow["Campo"] = drParámetros[i]["Campo"];
                    newRow["Valores"] = drParámetros[i]["Valores"];
                    newRow["Parámetros"] = drParámetros[i]["Parámetros"];
                    newRow["Dato"] = drParámetros[i]["Dato"];
                    Parámetros.Rows.Add(newRow);
                }

                Agrupar.Rows.Clear();
                DataRow[] drAgrupar = drConsulta.GetChildRows("FK_Agrupar");
                for (int i = 0; i < drAgrupar.Length; i++)
                {
                    DataRow newRow = Agrupar.NewRow();
                    newRow["Concepto"] = drAgrupar[i]["Concepto"];
                    newRow["Campo"] = drAgrupar[i]["Campo"];
                    newRow["Origen"] = drAgrupar[i]["Concepto"]; // ← Mapear Concepto a Origen
                    Agrupar.Rows.Add(newRow);
                }

                DateTime.TryParse(drConsulta["Desde"].ToString(), out Desde);
            }
            /// <summary>
            /// Guarda, actualiza o borra una consulta.
            /// </summary>
            /// <param name="idConsulta">idConsulta, 0 si es nueva.</param>
            /// <param name="Nombre">Nombre de la consulta. "" para borrar.</param>
            /// <param name="Parámetros">Tabla con los parámetros.</param>
            /// <param name="Agrupar">Tabla con los campos a agrupar.</param>
            /// <param name="Desde">Fecha desde para realizar los conteos.</param>
            public async Task<bool> GuardarConsultaAsync(
             int idConsulta,
             string nombre,
             object idProducto,
             object idCartera,
             DataTable parametros,
             DataTable agrupar,
             DateTime desde,
             int idEjecutivo,
             string servidor,
             string tipoBase)

            {
                try
                {
                    using var conn = _dbContextFactory.GetSqlConnection(servidor, tipoBase);
                    if (conn.State != ConnectionState.Open)
                        await conn.OpenAsync();

                    string sNombreConsulta = nombre.Replace("'", "");
                    string sQuery;

                    DataTable tblConsultas = _Consultas.Tables["Consultas"];
                    DataRow[] drNombres = tblConsultas.Select("NombreConsulta = '" + sNombreConsulta + "'");
                    if (drNombres.Length == 1)
                        idConsulta = Convert.ToInt32(drNombres[0]["idConsulta"]);

                    // DELETE 
                    if (idConsulta != 0)
                    {
                        const string sqlDelete = @"
                    DELETE Consultas WHERE idConsulta = @idConsulta;";

                        int rows = await conn.ExecuteAsync(sqlDelete, new { idConsulta });
                        if (rows == 0)
                            return false;

                        DataRow rowToDelete = tblConsultas.Rows.Find(idConsulta);
                        if (rowToDelete != null)
                            rowToDelete.Delete();

                        tblConsultas.AcceptChanges();
                    }

                    // INSERT 
                    if (!string.IsNullOrEmpty(sNombreConsulta))
                    {
                        sQuery =
                            "INSERT INTO Consultas (idEjecutivo_Insert, NombreConsulta, idProducto, idCartera, Desde) " +
                            "VALUES (@idEjecutivo, @Nombre, @idProducto, @idCartera, @Desde); " +
                            "DECLARE @idConsulta INT = SCOPE_IDENTITY(); ";

                        if (agrupar.Rows.Count > 0)
                        {
                            sQuery += "\r\n\r\n INSERT INTO ConsultaAgrupar (idConsulta, Campo, Concepto) VALUES ";
                            for (int i = 0; i < agrupar.Rows.Count; i++)
                                sQuery += $"\r\n (@idConsulta, '{agrupar.Rows[i]["Campo"]}', '{agrupar.Rows[i]["Concepto"]}' ), ";
                            sQuery = sQuery.TrimEnd(',', ' ');
                        }

                        if (parametros.Rows.Count > 0)
                        {
                            sQuery += "\r\n\r\n INSERT INTO ConsultaParámetros (idConsulta, Concepto, Campo, Valores, Parámetros, Dato) VALUES ";
                            for (int i = 0; i < parametros.Rows.Count; i++)
                            {
                                sQuery += $"\r\n (@idConsulta, " +
                                    $"'{parametros.Rows[i]["Concepto"]}', " +
                                    $"'{parametros.Rows[i]["Campo"]}', N'" +
                                    $"{parametros.Rows[i]["Valores"]}', N'" +
                                    $"{parametros.Rows[i]["Parámetros"].ToString().Replace("'", "''")}', '" +
                                    $"{parametros.Rows[i]["Dato"]}'), ";
                            }
                            sQuery = sQuery.TrimEnd(',', ' ') + "\r\n\r\n SELECT @idConsulta idConsulta";
                        }

                        // Parámetros de inserción
                        var parametrosInsert = new
                        {
                           idEjecutivo,
                            Nombre = sNombreConsulta,
                            idProducto = idProducto ?? DBNull.Value,
                            idCartera,
                            Desde = desde
                        };

                        // Ejecutar el INSERT principal
                        int newId = await conn.ExecuteScalarAsync<int>(sQuery, parametrosInsert);

                        tblConsultas.Rows.Add(newId, idProducto, idCartera);

                        for (int i = 0; i < agrupar.Rows.Count; i++)
                        {
                            agrupar.Rows[i]["idConsulta"] = newId;
                            _Consultas.Tables["Agrupar"].ImportRow(agrupar.Rows[i]);
                        }

                        for (int i = 0; i < parametros.Rows.Count; i++)
                        {
                            parametros.Rows[i]["idConsulta"] = newId;
                            _Consultas.Tables["Parámetros"].ImportRow(parametros.Rows[i]);
                        }

                        tblConsultas.AcceptChanges();
                    }

                    return true;
                }
                catch (SqlException ex)
                {
                    Console.WriteLine($"Error al guardar consulta: {ex.Message}");
                    return false;
                }
            }
    
            /// <summary>
            /// Devuelve el query de la búsqueda.
            /// </summary>
            /// <param name="idProducto">idProducto que se consultará.</param>
            /// <param name="Parámetros">Tabla con parámetros.</param>
            /// <param name="Agrupar">Tabla con agrupaciones.</param>
            /// <param name="Detalle">Indica si se desea detalle o agrupación.</param>
            /// <param name="Desde">Fecha desde para los conteos.</param>
            /// <param name="idCartera">Id de la cartera</param>
            /// <returns></returns>
            public static string PreparaQueryBúsqueda(int idProducto, DataTable Parámetros, DataTable Agrupar, Resultado Conteo, DateTime Desde, int idCartera)
            {
                ArrayList listaColumnas = new ArrayList();
                var resultado = GeneraQueryCuentas(idProducto, Parámetros, Agrupar, Conteo, Desde, idCartera, ref listaColumnas);
                return resultado.Query; 
            }
            /// <summary>
            /// Crea el query para realizar la consulta de pagos  de las cuentas con su negociación.
            /// </summary>
            /// <param name="idCartera">id de cartera que se va a consultar.</param>
            /// <param name="Desde">Fecha desde para el periodo de la consulta.</param>
            /// /// <param name="Hasta">Fecha hasta para el periodo de la consulta.</param>
            /// <param name="idConsulta">id de la consulta de cuentas.</param>
            /// <returns></returns>
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

            /// <summary>
            /// Crea el query para realizar la consulta de correos de la cartera.
            /// </summary>
            /// <param name="idCartera">id de cartera que se va a consultar.</param>        
            /// <param name="idConsulta">id de la consulta de cuentas.</param>
            /// <returns></returns>

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

            /// <summary>
            /// Crea el query para realizar la consulta de domicilios de las cuentas con su última visita.
            /// </summary>
            /// <param name="idCartera">id de cartera que se va a consultar.</param>
            /// <param name="Desde">Fecha desde para el periodo de la consulta.</param>
            /// <param name="idConsulta">id de la consulta de cuentas.</param>
            /// <returns></returns>
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


            /// <summary>
            /// Crea el query para realizar la consulta de visitas.
            /// </summary>
            /// <param name="idCartera">id de cartera que se va a consultar.</param>
            /// <param name="idConsulta">id de la consulta de cuentas.</param>
            /// <param name="Complemento">True si desea sacar visitas de Complemento.</param>
            /// <returns></returns>
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
            //public static SqlQueryData GeneraQueryCuentas(
            //    int idProducto,
            //    DataTable tblParámetros,
            //    DataTable tblAgrupar,
            //    CoorinWeb.Loki.Common.Resultado Conteo, // Uso explícito del namespace
            //    DateTime Desde,
            //    int idCartera,
            //    ref ArrayList alColumnas
            //)
            //{
            //    string sQuery = "";
            //    bool bConteosTels = false;

            //    string sSelect = "\t Z.idCuenta AS 'Cuenta' \r\n";
            //    string sFrom = " FROM dbCollection..Cuentas Z WITH (NOLOCK) \r\n";
            //    string sWhere = " WHERE Z.idCartera = " + idCartera + " AND Z.CuentaActiva = 1 \r\n";
            //    string sGroupBy = "Z.idCuenta, ";

            //    // Inicialización de las variables usadas en el bloque final 'if'
            //    // ¡IMPORTANTE!: Estos valores deben venir de algún lugar, no ser "hardcodeados" aquí
            //    // a menos que sea el comportamiento deseado por defecto.
            //    string telefono = "0", clase = "0", telefonica = "0", origen = "0", confirmado = "0", huso = "0", entidad = "0";
            //    string ultima = "0", sinConocido = "0", desconocido = "0", conocido = "0", titulares = "0";
            //    int hora = 0;
            //    string tipoHora = "";


            //    foreach (DataRow drFila in tblParámetros.Rows)
            //    {
            //        string sCampo = drFila["Campo"].ToString();
            //        string sOperador = drFila["Operador"].ToString();
            //        string sValor = drFila["Valor"].ToString();
            //        string sLogica = drFila["Logica"].ToString();
            //        string sTipo = drFila["Tipo"].ToString();

            //        if (!string.IsNullOrEmpty(sCampo))
            //        {
            //            sWhere += $" {sLogica} Z.{sCampo} {sOperador} ";
            //            if (sTipo == "string" || sTipo == "varchar")
            //                sWhere += $"'{sValor}'";
            //            else
            //                sWhere += sValor;
            //            sWhere += " \r\n";
            //        }
            //    }

            //    foreach (DataRow drFila in tblAgrupar.Rows)
            //    {
            //        string Concepto = drFila["Origen"].ToString();
            //        string sCampo = drFila["Campo"].ToString();

            //        switch (Concepto)
            //        {
            //            case "Teléfonos":
            //                if (!sFrom.Contains("ConteosTels"))
            //                {
            //                    sFrom += "\t LEFT JOIN ( \r\n" +
            //                            "\t\t\t\t SELECT idCuenta, idCartera, NúmeroTelefónico, idContacto, Fecha_Insert \r\n" +
            //                            "\t\t\t\t FROM dbCollection..GestionesTelefónicas WITH (NOLOCK) \r\n" +
            //                            "\t\t\t\t WHERE idCartera = " + idCartera + " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' \r\n" +
            //                            "\t\t\t UNION ALL \r\n" +
            //                            "\t\t\t\t SELECT idCuenta, idCartera, NúmeroTelefónico, idContacto, Fecha_Insert \r\n" +
            //                            "\t\t\t\t FROM dbCollection..GestionesChat WITH (NOLOCK) \r\n" +
            //                            "\t\t\t\t WHERE idCartera = " + idCartera + " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' \r\n" +
            //                            "\t\t\t ) GT_Combined \r\n" +
            //                            "\t\t\t INNER JOIN ( \r\n" +
            //                            "\t\t\t\tSELECT GT.idCuenta, GT.NúmeroTelefónico, \r\n" +
            //                            "\t\t\t\tSUM( CASE WHEN idContacto=1101 THEN 1 ELSE 0 END ) AS 'Titulares', \r\n" +
            //                            "\t\t\t\tSUM( CASE WHEN idContacto=1102 THEN 1 ELSE 0 END ) AS 'Conocidos', \r\n" +
            //                            "\t\t\t\tSUM( CASE WHEN idContacto IN (/*idsRelaciones(1103)*/'1103') THEN 1 ELSE 0 END ) AS 'Desconocidos', \r\n" +
            //                            "\t\t\t\tSUM( CASE WHEN idContacto NOT IN (1101,1102, /*idsRelaciones(1103)*/'1103') THEN 1 ELSE 0 END ) AS 'SinContacto', \r\n" +
            //                            "\t\t\t\tMAX(Fecha_Insert) AS 'ÚltimaMarcación' \r\n" +
            //                            "\t\t\t\tFROM ( \r\n" +
            //                            "\t\t\t\t  SELECT idCuenta, idCartera, NúmeroTelefónico, idContacto, Fecha_Insert \r\n" +
            //                            "\t\t\t\t  FROM dbCollection..GestionesTelefónicas WITH (NOLOCK) \r\n" +
            //                            "\t\t\t\t  WHERE idCartera = " + idCartera + " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' \r\n" +
            //                            "\t\t\t\t  UNION ALL \r\n" +
            //                            "\t\t\t\t  SELECT idCuenta, idCartera, NúmeroTelefónico, idContacto, Fecha_Insert \r\n" +
            //                            "\t\t\t\t  FROM dbCollection..GestionesChat WITH (NOLOCK) \r\n" +
            //                            "\t\t\t\t  WHERE idCartera = " + idCartera + " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' \r\n" +
            //                            "\t\t\t\t) GT \r\n" +
            //                            "\t\t\t\tWHERE GT.idCartera = " + idCartera + " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' \r\n" +
            //                            "\t\t\t\tGROUP BY GT.idCuenta, GT.NúmeroTelefónico \r\n" +
            //                            "\t\t\t) ConteosTels ON ConteosTels.idCuenta = Z.idCuenta AND ConteosTels.NúmeroTelefónico = Z.NúmeroTelefónico \r\n ";
            //                }
            //                bConteosTels = true;

            //                if (sCampo == "ÚltimaMarcación")
            //                {
            //                    ultima = "1";
            //                    sSelect += "\t ,ConteosTels.ÚltimaMarcación \r\n ";
            //                    sGroupBy += "ConteosTels.ÚltimaMarcación, ";
            //                }
            //                else if (sCampo == "Municipio")
            //                {
            //                    sSelect += "\t ,ISNULL(Z." + sCampo + ",0) AS [" + drFila["Campo"] + "] \r\n ";
            //                    sGroupBy += "ISNULL(Z." + sCampo + ",0), \r\n ";
            //                }
            //                else
            //                {
            //                    if (sCampo == "SinContacto") sinConocido = "1";
            //                    if (sCampo == "Desconocidos") desconocido = "1";
            //                    if (sCampo == "Conocidos") conocido = "1";
            //                    if (sCampo == "Titulares") titulares = "1";
            //                    sSelect += "\t ,ISNULL(ConteosTels." + sCampo + ",0) AS [" + drFila["Campo"] + "] \r\n ";
            //                    sGroupBy += "ISNULL(ConteosTels." + sCampo + ",0), \r\n ";
            //                }
            //                break;

            //            case "Gestiones":
            //                if (sCampo == "Usuario")
            //                {
            //                    if (!sFrom.Contains("Ejecutivos E "))
            //                        sFrom += "\t INNER JOIN dbCollection..Ejecutivos E WITH (NOLOCK) ON Z.idEjecutivo = E.idEjecutivo \r\n";
            //                    sSelect += "\t ,E.Usuario \r\n ";
            //                    sGroupBy += "E.Usuario, ";
            //                }
            //                else if (sCampo == "Teléfono")
            //                {
            //                    sSelect += "\t ,Z.NúmeroTelefónico \r\n ";
            //                    if (Conteo == CoorinWeb.Loki.Common.Resultado.Detalle) // Uso explícito del namespace
            //                        sSelect += "\t ,CA.NombreDeudor AS 'Nombre' ";
            //                    sGroupBy += "Z.NúmeroTelefónico, ";
            //                }
            //                else if (sCampo == "Extensión")
            //                {
            //                    sSelect += "\t ,Z.Extensión \r\n ";
            //                    sGroupBy += "Z.Extensión, ";
            //                }
            //                else if (sCampo == "Fecha")
            //                {
            //                    sSelect += "\t ,Z.Fecha_Insert AS Fecha \r\n ";
            //                    sGroupBy += "Z.Fecha_Insert, ";
            //                }
            //                else if (sCampo == "Hora")
            //                {
            //                    sSelect += "\t ,Z.Segundo_Insert AS Hora \r\n ";
            //                    sGroupBy += "Z.Segundo_Insert, ";
            //                }
            //                else if (sCampo == "Duración" || sCampo == "TiempoEnCuenta")
            //                {
            //                    sSelect += "\t ,Z." + sCampo + " \r\n ";
            //                    sGroupBy += "Z." + sCampo + ", ";
            //                }
            //                else if (sCampo == "Comentario" || sCampo == "NombreContacto")
            //                {
            //                    sSelect += "\t ,Z." + sCampo + " \r\n ";
            //                    sGroupBy += "Z." + sCampo + ", ";
            //                }
            //                else
            //                {
            //                    sSelect += "\t ," + sCampo + ".Valor AS '" + sCampo + "' \r\n ";
            //                    sFrom += "\t LEFT JOIN dbCollection..ValoresCatálogo " + sCampo + " ON Z.id" + sCampo + " = " + sCampo + ".idValor \r\n";
            //                    sGroupBy += sCampo + ".Valor, ";
            //                }
            //                break;

            //            case "Negociaciones":
            //                if (sCampo == "Usuario" || sCampo == "Validador")
            //                {
            //                    string sAlias = sCampo.Substring(0, 1);
            //                    if (!sFrom.Contains("Ejecutivos " + sAlias))
            //                        sFrom += "\t INNER JOIN dbCollection..Ejecutivos " + sAlias + " WITH (NOLOCK) ON Z.idEjecutivo" + (sAlias == "V" ? "Validador" : "") + " = " + sAlias + ".idEjecutivo \r\n";
            //                    sSelect += "\t ," + sAlias + ".Usuario AS '" + sCampo + "' \r\n ";
            //                    sGroupBy += "" + sAlias + ".Usuario, ";
            //                }
            //                else if (sCampo == "Estado")
            //                {
            //                    sSelect += "\t ,Estado.Valor AS 'Estado' \r\n ";
            //                    sFrom += "\t INNER JOIN dbCollection..ValoresCatálogo Estado ON Z.idEstado = Estado.idValor \r\n";
            //                    sGroupBy += "Estado.Valor, ";
            //                }
            //                else if (sCampo == "Herramienta")
            //                {
            //                    sSelect += "\t ,H.Nombre AS 'Herramienta' \r\n ";
            //                    sFrom += "\t INNER JOIN dbCollection..Herramientas H ON Z.idHerramienta = H.idHerramienta \r\n";
            //                    sGroupBy += "H.Nombre, ";
            //                }
            //                else if (sCampo == "CartaConvenio")
            //                {
            //                    sSelect += "\t ,CASE Z." + sCampo + " WHEN 1 THEN 'Sí' ELSE 'No' END AS '" + sCampo + "' \r\n ";
            //                    sGroupBy += "Z." + sCampo + ", ";
            //                }
            //                else if (sCampo == "Fecha_Plazo")
            //                {
            //                    sSelect += "\t ,L.FechaPago AS 'Fecha_Plazo' \r\n ";

            //                    if (Conteo == CoorinWeb.Loki.Common.Resultado.Detalle) // Uso explícito del namespace
            //                    {
            //                        sSelect += "\t ,L.MontoPago AS 'Monto_Plazo' \r\n ";
            //                        sSelect += "\t ,CONVERT(TINYINT,L.Cumplido) AS 'Cumplido_Plazo' \r\n ";
            //                        sSelect += "\t ,L.SumaPagos AS 'Pagos_Plazo' \r\n ";
            //                        sSelect += "\t ,L.Ordinal AS 'Ordinal_Plazo'  \r\n ";
            //                    }
            //                    else
            //                    {
            //                        sSelect += "\t ,SUM(L.MontoPago) AS 'Montos_Plazo' \r\n ";
            //                        sSelect += "\t ,SUM(L.SumaPagos) AS 'Pagos_Plazo' \r\n ";
            //                    }

            //                    if (!sFrom.Contains("..Plazos L "))
            //                        sFrom += "\t INNER JOIN dbCollection..Plazos L WITH (NOLOCK) ON Z.idCartera = L.idCartera AND Z.idCuenta = L.idCuenta AND Z.Fecha_Insert = L.Fecha_Insert AND Z.Segundo_Insert = L.Segundo_Insert \r\n";
            //                    sGroupBy += "L.FechaPago, ";
            //                }
            //                else
            //                {
            //                    string sColumna = sCampo;
            //                    if (sColumna == "Hora")
            //                    {
            //                        sColumna = "Segundo_Insert";
            //                        sSelect += "\t ,Z.Segundo_Insert AS 'Hora' \r\n ";
            //                    }
            //                    else if (sColumna == "FechaCreación")
            //                    {
            //                        sColumna = "Fecha_Insert";
            //                        sSelect += "\t ,Z.Fecha_Insert AS 'FechaCreación' \r\n ";
            //                    }
            //                    else if (sColumna == "Correo")
            //                    {
            //                        sColumna = "CorreoElectrónico";
            //                        sSelect += "\t ,Z.CorreoElectrónico AS 'Correo' \r\n ";
            //                    }
            //                    else if (sColumna == "TipoNegociación" || sColumna == "Modo" || sColumna == "NúmeroTelefónico")
            //                    {
            //                        if (sColumna == "TipoNegociación") sSelect += "\t ,Acercamiento.Valor TipoNegociación \r\n ";
            //                        if (sColumna == "Modo") sSelect += "\t ,Modo.Valor Modo \r\n ";
            //                        if (sColumna == "NúmeroTelefónico") sSelect += "\t ,P.NúmeroTelefónico \r\n ";

            //                        if (!sFrom.Contains("vw_Plazos P"))
            //                        {
            //                            sFrom += "\t LEFT JOIN vw_Plazos P ON Z.idCartera = P.idCartera AND Z.idCuenta = P.idCuenta AND Z.Fecha_Insert = P.Fecha_Insert AND Z.Segundo_Insert = P.Segundo_Insert \r\n";
            //                        }

            //                        if (sColumna == "TipoNegociación") sFrom += "\t INNER JOIN dbCollection..ValoresCatálogo Acercamiento ON P.idAcercamiento = Acercamiento.idValor \r\n";
            //                        if (sColumna == "Modo") sFrom += "\t INNER JOIN dbCollection..ValoresCatálogo Modo ON P.idModo = Modo.idValor \r\n";
            //                    }
            //                    else if (Conteo != CoorinWeb.Loki.Common.Resultado.Detalle && (sColumna == "MontoNegociado" || sColumna == "MontoPagado" || sColumna == "SaldoNegociación"))
            //                        sSelect += "\t ,SUM(Z." + sColumna + ") AS '" + sColumna + "' \r\n ";
            //                    else
            //                        sSelect += "\t ,Z." + sColumna + " \r\n ";

            //                    if (sColumna != "MontoNegociado" && sColumna != "MontoPagado" && sColumna != "SaldoNegociación")
            //                    {
            //                        if (sColumna == "TipoNegociación" || sColumna == "Modo" || sColumna == "NúmeroTelefónico" || sColumna == "Folio")
            //                        {
            //                            if (sColumna == "TipoNegociación")
            //                            {
            //                                if (sGroupBy.Contains("Modo.Valor")) sGroupBy += ", Acercamiento.Valor";
            //                                else sGroupBy += "Acercamiento.Valor, ";
            //                            }
            //                            if (sColumna == "Modo")
            //                            {
            //                                if (sGroupBy.Contains("Acercamiento.Valor")) sGroupBy += ", Modo.Valor";
            //                                else sGroupBy += "Modo.Valor, ";
            //                            }
            //                            if (sColumna == "NúmeroTelefónico")
            //                            {
            //                                if (sGroupBy.Contains("Acercamiento.Valor")) sGroupBy += ", P.NúmeroTelefónico";
            //                                else sGroupBy += " P.NúmeroTelefónico, ";
            //                            }
            //                            if (sColumna == "Folio")
            //                            {
            //                                sGroupBy += " Z.Folio, ";
            //                            }
            //                        }
            //                        else
            //                        {
            //                            sGroupBy += "Z." + sColumna + ", ";
            //                        }
            //                    }

            //                    if (sColumna == "Plazos" && Conteo == CoorinWeb.Loki.Common.Resultado.Detalle) // Uso explícito del namespace
            //                    {
            //                        int iNumPlazos = 3;
            //                        if (idCartera == 4 || idCartera == 1 || idCartera == 14)
            //                            iNumPlazos = 100;
            //                        else if (idCartera == 15)
            //                            iNumPlazos = 5;
            //                        for (int i = 0; i < iNumPlazos; i++)
            //                            sSelect += "\t ,P.FechaPlazo" + (i + 1) + ", P.MontoPlazo" + (i + 1) + " \r\n";
            //                        if (!sFrom.Contains("vw_Plazos P"))
            //                        {
            //                            sFrom += "\t LEFT JOIN vw_Plazos P ON Z.idCartera = P.idCartera AND Z.idCuenta = P.idCuenta AND Z.Fecha_Insert = P.Fecha_Insert AND Z.Segundo_Insert = P.Segundo_Insert \r\n";
            //                        }
            //                    }
            //                }
            //                break;

            //            case "Seguimientos":
            //                if (sCampo == "Usuario")
            //                {
            //                    if (!sFrom.Contains("Ejecutivos E "))
            //                        sFrom += "\t INNER JOIN dbCollection..Ejecutivos E WITH (NOLOCK) ON Z.idEjecutivo = E.idEjecutivo \r\n";
            //                    sSelect += "\t ,E.Usuario \r\n ";
            //                    sGroupBy += "E.Usuario, ";
            //                }
            //                else if (sCampo == "Recordatorio" || sCampo == "Realizado")
            //                {
            //                    sSelect += "\t ,CASE Z." + sCampo + " WHEN 1 THEN 'Sí' WHEN 0 THEN 'No' END AS '" + sCampo + "' \r\n ";
            //                    sGroupBy += "Z." + sCampo + ", ";
            //                }
            //                else
            //                {
            //                    string sColumna = sCampo;
            //                    if (sColumna == "FechaCreación")
            //                    {
            //                        sColumna = "Fecha_Insert";
            //                        sSelect += "\t ,Z.Fecha_Insert AS 'FechaCreación' \r\n ";
            //                    }
            //                    else if (sColumna == "HoraCreación")
            //                    {
            //                        sColumna = "Segundo_Insert";
            //                        sSelect += "\t ,Z.Segundo_Insert AS 'Hora' \r\n ";
            //                    }
            //                    else if (sColumna == "HoraSeguimiento")
            //                    {
            //                        sColumna = "SegundoSeguimiento";
            //                        sSelect += "\t ,Z.SegundoSeguimiento AS 'HoraSeguimiento' \r\n ";
            //                    }
            //                    else if (sColumna == "Teléfono")
            //                    {
            //                        sColumna = "NúmeroTelefónico";
            //                        sSelect += "\t ,Z.NúmeroTelefónico AS 'Teléfono' \r\n " +
            //                                "\t ,CA.NombreDeudor AS 'Deudor' \r\n ";
            //                        if (!sFrom.Contains("Cuentas CA"))
            //                            sFrom += " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON Z.idCartera = CA.idCartera AND Z.idCuenta = CA.idCuenta AND CA.CuentaActiva = 1 \r\n";
            //                        sGroupBy += "Z.NúmeroTelefónico, CA.NombreDeudor, ";
            //                    }
            //                    else
            //                        sSelect += "\t ,Z." + sColumna + " \r\n ";

            //                    sGroupBy += "Z." + sColumna + ", ";
            //                }

            //                if (sCampo == "Realizado" && Conteo == CoorinWeb.Loki.Common.Resultado.Detalle) // Uso explícito del namespace
            //                {
            //                    sFrom += "\tLEFT JOIN dbCollection..Ejecutivos R ON Z.idEjecutivoRealizado = R.idEjecutivo \r\n";
            //                    sSelect += "\t ,R.Usuario AS 'UsuarioRealizó' \r\n";
            //                    sSelect += "\t ,Z.SegundoRealizado AS 'HoraRealizado' \r\n";
            //                }
            //                break;

            //            case "Chats":
            //                if (sCampo == "Usuario")
            //                {
            //                    if (!sFrom.Contains("Ejecutivos E "))
            //                        sFrom += "\t INNER JOIN dbCollection..Ejecutivos E WITH (NOLOCK) ON Z.idEjecutivo = E.idEjecutivo \r\n";
            //                    sSelect += "\t ,E.Usuario \r\n ";
            //                    sGroupBy += "E.Usuario, ";
            //                }
            //                else if (sCampo == "Teléfono")
            //                {
            //                    sSelect += "\t ,Z.NúmeroTelefónico \r\n " +
            //                                "\t ,CA.NombreDeudor AS 'Deudor' \r\n ";
            //                    if (!sFrom.Contains("Cuentas CA"))
            //                        sFrom += " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON Z.idCartera = CA.idCartera AND Z.idCuenta = CA.idCuenta AND CA.CuentaActiva = 1 \r\n";
            //                    sGroupBy += "Z.NúmeroTelefónico, CA.NombreDeudor, ";
            //                }
            //                else if (sCampo == "Fecha")
            //                {
            //                    sSelect += "\t ,Z.Fecha_Insert AS Fecha \r\n ";
            //                    sGroupBy += "Z.Fecha_Insert, ";
            //                }
            //                else if (sCampo == "Hora")
            //                {
            //                    sSelect += "\t ,Z.Segundo_Insert AS Hora \r\n ";
            //                    sGroupBy += "Z.Segundo_Insert, ";
            //                }
            //                else if (sCampo == "Duración")
            //                {
            //                    sSelect += "\t ,Z.Duración \r\n ";
            //                    sGroupBy += "Z.Duración, ";
            //                }
            //                else if (sCampo == "Comentario")
            //                {
            //                    sSelect += "\t ,Z.Comentario \r\n ";
            //                    sGroupBy += "Z.Comentario, ";
            //                }
            //                else if (sCampo == "Salida")
            //                {
            //                    sSelect += "\t ,CASE Z." + sCampo + " WHEN 1 THEN 'Sí' ELSE 'No' END AS '" + sCampo + "' \r\n ";
            //                    sGroupBy += "Z." + sCampo + ", ";
            //                }
            //                else
            //                {
            //                    sSelect += "\t ," + sCampo + ".Valor AS '" + sCampo + "' \r\n ";
            //                    sFrom += "\t LEFT JOIN dbCollection..ValoresCatálogo " + sCampo + " ON Z.id" + sCampo + " = " + sCampo + ".idValor \r\n";
            //                    sGroupBy += sCampo + ".Valor, ";
            //                }
            //                break;
            //        }

            //        if (!alColumnas.Contains(drFila["Campo"].ToString()) &&
            //            !sCampo.Contains("MontoNegociado") && !sCampo.Contains("MontoPagado") && !sCampo.Contains("SaldoNegociación") &&
            //            sCampo != "ÚltimaMarcación" && sCampo != "Titulares" && sCampo != "Conocidos" && sCampo != "Desconocidos" && sCampo != "SinContacto")
            //        {
            //            alColumnas.Add(drFila["Campo"].ToString());
            //        }
            //    }

            //    if (sGroupBy.Length == 0 || Conteo == CoorinWeb.Loki.Common.Resultado.Detalle) // Uso explícito del namespace
            //        sGroupBy = "";
            //    else
            //        sGroupBy = " GROUP BY " + sGroupBy.TrimEnd(new char[] { ',', ' ' });

            //    if (Conteo == CoorinWeb.Loki.Common.Resultado.FilaDeTrabajo) // Uso explícito del namespace
            //    {
            //        sSelect = "\t Z.idCartera, Z.idCuenta, Z.idEjecutivo " + (tblAgrupar.Rows.Cast<DataRow>().Any(dr => dr["Origen"].ToString() == "Negociaciones") ? ", NULL AS [NúmeroTelefónico] \r\n" : ", Z.NúmeroTelefónico \r\n");
            //        sGroupBy = "";
            //    }

            //    int ejecutivoJerarquia = 99; // Este valor debería ser dinámico, no hardcodeado.

            //    if (Conteo == CoorinWeb.Loki.Common.Resultado.Detalle && ejecutivoJerarquia < 3) // Uso explícito del namespace
            //        if (idCartera == 1)
            //            sSelect = sSelect.Replace("Z.idCuenta AS 'Cuenta'", "STUFF(STUFF(Z.idCuenta,1,2,'XX'),13, 2,'XX') [Cuenta]");
            //        else
            //            sSelect = sSelect.Replace("Z.idCuenta AS 'Cuenta'", "STUFF(Z.idCuenta,1,LEN(Z.idCuenta)-4,'XXX-XXX-') [Cuenta]");

            //    sQuery = "SELECT \r\n " + sSelect + sFrom + sWhere + sGroupBy;

            //    if (idCartera == 1 && telefono == "1" && clase == "1" && telefonica == "1" && origen == "1" && confirmado == "1" && huso == "1" && entidad == "1" && ultima == "1" && sinConocido == "1" && desconocido == "1" && conocido == "1" && titulares == "1")
            //    {
            //        if (hora >= 7 && hora < 9 && tipoHora == "a. m.")
            //        {
            //            sQuery += " and Z.HusoHorario=0 and Z.idTelefonía <>2104 and Z.idTelefonía<>2105 and Z.idTelefonía<>2106";
            //        }
            //    }

            //    if (idCartera == 24 && sQuery.Contains("Intentos_ViciDial"))
            //        sQuery = sQuery.Replace("FROM Intentos_ViciDial", "FROM dbHistory.CFE.Intentos_ViciDial");

            //    return new SqlQueryData(sQuery, alColumnas); // Se devuelve el objeto completo
            //}
            public static SqlQueryData GeneraQueryCuentas(
           object idProducto,
           DataTable tblParámetros,
           DataTable tblAgrupar,
           Resultado Conteo,
           DateTime Desde,
           object idCarteraParam,
           ref ArrayList listaColumnas)
            {
                // Inicializamos SqlQueryData
                var queryData = new SqlQueryData();
                listaColumnas = new ArrayList();
                queryData.Columns = listaColumnas;

                // Manejo de idProducto y idCartera
                if (idProducto != null && idProducto.ToString() == "")
                    idProducto = null;

                int idCartera = idCarteraParam == null || idCarteraParam.ToString() == ""
                    ? 0 // valor por defecto si es necesario
                    : Convert.ToInt32(idCarteraParam);

                string sQuery = "SELECT \r\n",
                       sSelect = Conteo == Resultado.Detalle
                           ? "\t.idCuenta Cuenta, Car.Abreviación + CONVERT(VARCHAR(10),C.Expediente) \r\n"
                           : "\t COUNT(C.idCuenta) AS 'Cuentas', ISNULL(SUM(C.Saldo) ,0) AS 'Saldo' \r\n",
                       sFrom = " FROM dbCollection..Cuentas C WITH (NOLOCK) \r\n",
                       sWhere = " WHERE C.CuentaActiva = 1 AND C.idCartera = " + idCartera + (idProducto == null ? "" : " AND C.idProducto = " + idProducto) + " \r\n",
                       sGroupBy = "";

                //if ( idCarteraParam > 0 )
                if (Conteo == Resultado.Cuentas || Conteo == Resultado.FilaDeTrabajo)
                    sSelect = "\tC.idCartera, C.idCuenta\r\n";
                else if (Conteo == Resultado.Detalle)
                    sFrom += "\t INNER JOIN dbCollection..Carteras Car ON C.idCartera = Car.idCartera \r\n ";

                //filtros
                foreach (DataRow drFila in tblParámetros.Rows)
                    {
                        string concepto = drFila["Concepto"].ToString();
                        string campo = drFila["Campo"].ToString();
                        string valores = drFila["Parámetros"].ToString();
                        string sNot = valores.Contains("≠") ? "NOT" : "";

                        switch (concepto)
                        {
                            case "Cuenta":
                                if (campo == "Nivel")
                                {
                                    sFrom += "\tINNER JOIN dbCollection..RelacionesCatálogos R ON C.idSituación = R.idValor1 \r\n";
                                    sFrom += "\tINNER JOIN dbCollection..ValoresCatálogo Nivel ON R.idValor2 = Nivel.idValor\r\n";
                                    sWhere += "\tAND R.idValor2 " + sNot + " IN (" + valores + ") \r\n";
                                    sWhere += "\tAND Nivel.idCatálogo = 4 \r\n";
                                }
                                else if (campo == "RFC")
                                    sWhere += "\tAND RTRIM(LTRIM(C.RFC)) " + sNot + " IN (" + valores.Replace("=", "'").Replace("≠", "'").Replace(",", "',") + "') \r\n";
                                else if (campo == "Bloqueo")
                                    sWhere += "\tAND C." + campo + " " + sNot + " IN (" + valores + ") \r\n";
                                else
                                    sWhere += "\tAND C.id" + campo + " " + sNot + " IN (" + valores + ") \r\n";
                                break;

                            case "Producto":
                                if (idProducto == null && !sFrom.Contains("Y.Cartera_"))
                                    sFrom += "\tINNER JOIN dbCollection.Y.Cartera_" + idCartera + " Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta \r\n";
                                if (idProducto != null && !sFrom.Contains("Y.Producto_"))
                                    sFrom += "\tINNER JOIN dbCollection.Y.Producto_" + idProducto + " Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta \r\n";

                                if (drFila["Dato"].ToString() == "char")
                                    sWhere += "\tAND ISNULL(Y.[" + campo + "], '') " + sNot + " IN (" + valores.Replace("=", "'").Replace("≠", "'").Replace(",", "',") + "') \r\n";
                                else if (drFila["Dato"].ToString() == "int")
                                    foreach (var val in valores.Replace("≠", "<>").Split(','))
                                        sWhere += "\tAND CASE WHEN ISNUMERIC(Y.[" + campo + "]) = 1 THEN CONVERT(MONEY, Y.[" + campo + "]) ELSE NULL END " + val + "\r\n";
                                else if (drFila["Dato"].ToString() == "date")
                                    foreach (var val in valores.Replace("≠", "<>").Split(','))
                                        sWhere += "\tAND CASE WHEN ISDATE(Y.[" + campo + "]) = 1 THEN CONVERT(DATETIME, Y.[" + campo + "]) ELSE NULL END " + val + "\r\n";
                                break;

                        case "Conteos":
                            {
                                string sNombreTabla = drFila["Campo"].ToString();
                                string sAlias = sNombreTabla.Substring(0, 1);
                                string sFecha = " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' ";

                                // Ajustes según tipo de Campo
                                switch (sNombreTabla)
                                {
                                    case "Gestiones": sNombreTabla = "GestionesTelefónicas"; break;
                                    case "Visitas":
                                        sNombreTabla = "GestionesDomiciliarias";
                                        sFecha = sFecha.Replace("Fecha_Insert", "Fecha_Visita");
                                        break;
                                    case "Comentarios": sAlias = "M"; break;
                                    case "Chats": sNombreTabla = "GestionesChat"; sAlias = "H"; break;
                                    case "Correos": sNombreTabla = "CorreosCuentas"; sAlias = "O"; sFecha = ""; break;
                                    case "Emails": sNombreTabla = "CorreosEnviados"; sAlias = "CE"; break;
                                    case "Cartas": sNombreTabla = "Accionamientos"; sAlias = "AC"; sFecha += " AND idAcercamiento = 1604 "; break;
                                    case "Blasters": sNombreTabla = "Accionamientos"; sAlias = "AB"; sFecha += " AND idAcercamiento = 1605 "; break;
                                    case "SMSs": sNombreTabla = "Accionamientos"; sAlias = "ASMS"; sFecha += " AND idAcercamiento = 1606 "; break;
                                    case "Telegramas": sNombreTabla = "Accionamientos"; sAlias = "AT"; sFecha += " AND idAcercamiento = 1608 "; break;
                                    case "Domicilios":
                                    case "Teléfonos": sFecha = ""; break;
                                    case "Pagos": sFecha = sFecha.Replace("Fecha_Insert", "FechaPago"); break;
                                    case "SumaPagos": sNombreTabla = "Pagos"; sAlias = "SP"; break;
                                }

                                // SELECT
                                sSelect += "\t,ISNULL(" + sAlias + ".Conteo,0) AS '" + drFila["Campo"].ToString() + "' \r\n";

                                // LEFT JOIN con conteo o suma
                                string joinQuery = "\t LEFT JOIN ( SELECT COUNT(*) Conteo, idCuenta FROM dbCollection.." + sNombreTabla + " WITH (NOLOCK) WHERE idCartera = " + idCartera + sFecha + " GROUP BY idCuenta) " + sAlias + " ON C.idCuenta = " + sAlias + ".idCuenta \r\n";
                                if (drFila["Campo"].ToString() == "SumaPagos")
                                    joinQuery = joinQuery.Replace(" COUNT(*) ", " SUM(MontoPago) ");

                                sFrom += joinQuery;

                                // Aplicar filtros del parámetro en WHERE
                                foreach (var val in drFila["Parámetros"].ToString().Replace("≠", "<>").Split(','))
                                    sWhere += "\t AND ISNULL(" + sAlias + ".Conteo,0) " + val + "\r\n";

                                listaColumnas.Add(drFila["Campo"].ToString());
                                break;
                            }


                        case "Fechas":
                                string col = campo switch
                                {
                                    "Activación" => "Fecha_CambioActivación",
                                    "Última gestión" => "FechaÚltimaGestión",
                                    "Última visita" => "FechaÚltimaVisita",
                                    "Último pago" => "FechaÚltimoPago",
                                    "Última negociación" => "FechaÚltimaNegociación",
                                    "Próximo seguimiento" => "FechaPróximoSeguimiento",
                                    _ => ""
                                };
                                foreach (var val in valores.Replace("≠", "<>").Split(','))
                                    sWhere += "\tAND C." + col + val + "\r\n";
                                break;
                        }
                    }

                // Columnas
                foreach (DataRow drFila in tblAgrupar.Rows)
                {
                    string concepto = drFila["Concepto"].ToString();
                    string campo = drFila["Campo"].ToString();

                    switch (concepto)
                    {
                        case "Cuenta":
                            if (campo == "Situación")
                            {
                                sSelect += Conteo == Resultado.Detalle ? "\t,Situación.Valor AS 'SituaciónCuenta' \r\n" :
                                "\t ,RIGHT('00' + CONVERT(VARCHAR(3),Situación.Orden),2) + ' ' + Situación.Valor AS 'SituaciónCuenta' \r\n ";
                                sFrom += "\tINNER JOIN dbCollection..ValoresCatálogo Situación ON C.idSituación = Situación.idValor \r\n";
                                sGroupBy += "Situación.Valor, Situación.Orden, ";
                                listaColumnas.Add("SituaciónCuenta");

                                if (Conteo == Resultado.Detalle) 
                                    sSelect += "\t ,SD.Valor AS 'SituaciónDesactivación' \r\n ";
                                sFrom += "\t LEFT JOIN dbCollection..ValoresCatálogo SD ON C.idSituaciónDesactivación = SD.idValor \r\n";
                                sGroupBy += "SD.Valor, ";
                            }
                            else if (campo == "Sucursal")
                            {
                                sSelect += "\t,Sucursal.Valor AS 'Sucursal' \r\n";
                                sFrom += "\tINNER JOIN dbCollection..ValoresCatálogo Sucursal ON C.idSucursal = Sucursal.idValor \r\n";
                                sGroupBy += "Sucursal.Valor, ";
                                listaColumnas.Add("Sucursal");
                            }
                            else if (campo == "Nivel")
                            {
                                sSelect += Conteo == Resultado.Detalle ?
                                sSelect += "\t,Nivel.Valor AS 'Nivel' \r\n" :
                                 "\t ,CONVERT(VARCHAR(3),Nivel.Orden) + ' ' + Nivel.Valor AS 'Nivel' \r\n ";

                                sFrom += sFrom.Contains("Relaciones") ? "" : "\t INNER JOIN dbCollection..RelacionesCatálogos R ON C.idSituación = R.idValor1 \r\n";
                                sFrom += sFrom.Contains("Nivel") ? "" : "\t INNER JOIN dbCollection..ValoresCatálogo Nivel ON R.idValor2 = Nivel.idValor \r\n";
                                sWhere += "\t AND Nivel.idCatálogo = 4";
                                sGroupBy += "Nivel.Valor, Nivel.Orden, ";
                                listaColumnas.Add("Nivel");
                            }
                            else if (campo == "CausaNoPago")
                            {
                                sSelect += "\t ,CausaNoPago.Valor AS 'CausaNoPago' \r\n ";
                                sFrom += "\t LEFT JOIN dbCollection..ValoresCatálogo CausaNoPago ON C.idCausaNoPago = CausaNoPago.idValor \r\n";
                                sGroupBy += "CausaNoPago.Valor, ";
                                listaColumnas.Add("CausaNoPago");
                            }
                            else if (campo == "RFC")
                            {
                                sSelect += "\t ,C.RFC \r\n ";
                                sGroupBy += "C.RFC, ";
                                listaColumnas.Add("RFC");
                            }
                            else if (campo == "Bloqueo")
                            {
                                sSelect += "\t ,CASE WHEN C.Bloqueo = 1 THEN 'Sí' ELSE 'No' END Bloqueo \r\n ";
                                sGroupBy += "CASE WHEN C.Bloqueo = 1 THEN 'Sí' ELSE 'No' END, ";
                                listaColumnas.Add("Bloqueo");
                            } break;

                        case "Producto":
                            sSelect += "\t ,Y.[" + drFila["Campo"] + "] \r\n ";

                            if (idProducto == null && !sFrom.Contains("Y.Cartera_"))
                                sFrom += "\t INNER JOIN dbCollection.Y.Cartera_" + idCartera + " Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta \r\n";
                            if (idProducto != null && !sFrom.Contains("Y.Producto_"))
                                sFrom += "\t INNER JOIN dbCollection.Y.Producto_" + idProducto + " Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta \r\n";

                            sGroupBy += "Y.[" + drFila["Campo"] + "], ";
                            listaColumnas.Add(drFila["Campo"].ToString());
                            
                            break;
                        case "Conteos":
                            string sNombreTabla = drFila["Campo"].ToString();
                            string sAlias = sNombreTabla.Substring(0, 1);
                            string sFecha = " AND Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' ";

                            if (drFila["Campo"].ToString() == "Gestiones")
                                sNombreTabla = "GestionesTelefónicas";
                            else if (drFila["Campo"].ToString() == "Visitas")
                            {
                                sNombreTabla = "GestionesDomiciliarias";
                                sFecha = sFecha.Replace("Fecha_Insert", "Fecha_Visita");
                            }
                            else if (drFila["Campo"].ToString() == "Comentarios")
                            {
                                //sFecha += " AND Gestión = 0 ";
                                sAlias = "M";
                            }
                            else if (drFila["Campo"].ToString() == "Chats")
                            {
                                sNombreTabla = "GestionesChat";
                                sAlias = "H";
                            }
                            else if (drFila["Campo"].ToString() == "Correos")
                            {
                                sFecha = "";
                                sNombreTabla = "CorreosCuentas";
                                sAlias = "O";
                            }
                            else if (drFila["Campo"].ToString() == "Emails")
                            {
                                sNombreTabla = "CorreosEnviados";
                                sAlias = "CE";
                            }
                            else if (drFila["Campo"].ToString() == "Cartas")
                            {
                                sFecha += " AND idAcercamiento = 1604 ";
                                sNombreTabla = "Accionamientos";
                                sAlias = "AC";
                            }
                            else if (drFila["Campo"].ToString() == "Blasters")
                            {
                                sFecha += " AND idAcercamiento = 1605 ";
                                sNombreTabla = "Accionamientos";
                                sAlias = "AB";
                            }
                            else if (drFila["Campo"].ToString() == "SMSs")
                            {
                                sFecha += " AND idAcercamiento = 1606 ";
                                sNombreTabla = "Accionamientos";
                                sAlias = "ASMS";
                            }
                            else if (drFila["Campo"].ToString() == "Telegramas")
                            {
                                sFecha += " AND idAcercamiento = 1608 ";
                                sNombreTabla = "Accionamientos";
                                sAlias = "AT";
                            }
                            else if (drFila["Campo"].ToString() == "Domicilios" || drFila["Campo"].ToString() == "Teléfonos")
                                sFecha = "";
                            else if (drFila["Campo"].ToString() == "Pagos")
                                sFecha = sFecha.Replace("Fecha_Insert", "FechaPago");


                            // Suma de pagos.
                            if (drFila["Campo"].ToString() == "SumaPagos")
                            {
                                if (Conteo == Resultado.Detalle || Conteo == Resultado.Cuentas)
                                    sSelect += "\t ,ISNULL(SP.Conteo,0) AS '" + drFila["Campo"] + "' \r\n ";
                                else
                                    sSelect += "\t ,ISNULL(SUM(SP.Conteo),0) AS '" + drFila["Campo"] + "' \r\n ";

                                if (!sFrom.Contains(" SP ON "))
                                    sFrom += "\t LEFT JOIN ( SELECT SUM(MontoPago) Conteo, idCuenta FROM dbCollection..Pagos WITH (NOLOCK) WHERE idCartera = " + idCartera + sFecha.Replace("FechaPago", "FechaPago") + " GROUP BY idCuenta) SP ON C.idCuenta = SP.idCuenta \r\n ";

                            }
                            else
                            {

                                sSelect += "\t ,ISNULL(" + sAlias + ".Conteo,0) AS '" + drFila["Campo"] + "' \r\n ";

                                if (!sFrom.Contains(" " + sAlias + " ON "))
                                    sFrom += "\t LEFT JOIN ( SELECT COUNT(*) Conteo, idCuenta FROM dbCollection.." + sNombreTabla + " WITH (NOLOCK) WHERE idCartera = " + idCartera + sFecha + " GROUP BY idCuenta) " + sAlias + " ON C.idCuenta = " + sAlias + ".idCuenta \r\n ";

                                sGroupBy += sAlias + ".Conteo, ";
                            }

                            listaColumnas.Add(drFila["Campo"].ToString());

                            break;


                        case "Fechas":

                            if (drFila["Campo"].ToString() == "Activación")
                            {
                                sSelect += "\t ,C.Fecha_CambioActivación AS 'Fecha activación' \r\n ";
                                sGroupBy += "C.Fecha_CambioActivación, ";
                                listaColumnas.Add("Fecha activación");
                            }
                            else if (drFila["Campo"].ToString() == "Última gestión")
                            {
                                sSelect += "\t ,C.FechaÚltimaGestión AS 'Última gestión' \r\n ";
                                sGroupBy += " FechaÚltimaGestión, ";
                                listaColumnas.Add("Última gestión");
                                if (Conteo == Resultado.Detalle)
                                {
                                    sSelect += "\t ,EG.Usuario AS 'EjecutivoGestión' \r\n ";
                                    sFrom += "\t LEFT JOIN dbCollection..Ejecutivos EG ON C.idEjecutivoÚltimaGestión = EG.idEjecutivo \r\n";
                                    listaColumnas.Add("EjecutivoGestión");
                                }
                            }
                            else if (drFila["Campo"].ToString() == "Última visita")
                            {
                                sSelect += "\t ,C.FechaÚltimaVisita AS 'Última visita' \r\n ";
                                sGroupBy += " FechaÚltimaVisita, ";
                                listaColumnas.Add("Última visita");
                                if (Conteo == Resultado.Detalle)
                                {
                                    sSelect += "\t ,EV.Usuario AS 'EjecutivoVisita' \r\n ";
                                    sFrom += "\t LEFT JOIN dbCollection..Ejecutivos EV ON C.idEjecutivoÚltimaVisita = EV.idEjecutivo \r\n";
                                    listaColumnas.Add("EjecutivoVisita");
                                }
                            }
                            else if (drFila["Campo"].ToString() == "Última negociación")
                            {
                                sSelect += "\t ,C.FechaÚltimaNegociación AS 'Última negociación' \r\n ";
                                sGroupBy += " FechaÚltimaNegociación, ";
                                listaColumnas.Add("Última negociación");
                                if (Conteo == Resultado.Detalle)
                                {
                                    sSelect += "\t ,EN.Usuario AS 'EjecutivoNegociación' \r\n ";
                                    sFrom += "\t LEFT JOIN dbCollection..Ejecutivos EN ON C.idEjecutivoÚltimaNegociación = EN.idEjecutivo \r\n";
                                    listaColumnas.Add("EjecutivoNegociación");
                                }
                            }
                            else if (drFila["Campo"].ToString() == "Último pago")
                            {
                                sSelect += "\t ,C.FechaÚltimoPago AS 'Último pago' \r\n ";
                                sGroupBy += " FechaÚltimoPago, ";
                                listaColumnas.Add("Último pago");
                                if (Conteo == Resultado.Detalle)
                                {
                                    sSelect += "\t ,C.MontoÚltimoPago AS 'Monto último pago' \r\n ";
                                    listaColumnas.Add("Monto último pago");
                                }

                            }
                            else if (drFila["Campo"].ToString() == "Próximo seguimiento")
                            {
                                sSelect += "\t ,C.FechaPróximoSeguimiento AS 'Próximo seguimiento' \r\n ";
                                sGroupBy += " FechaPróximoSeguimiento, ";
                                listaColumnas.Add("Próximo seguimiento");
                            }

                            break;
                    }
                }

                // Ajuste final GROUP BY
                sGroupBy = Conteo == Resultado.Contar || Conteo == Resultado.ContarCuentas
                    ? sGroupBy.TrimEnd(',', ' ')
                    : "";
                if (sGroupBy.Length > 0)
                    sGroupBy = "GROUP BY " + sGroupBy;

                // Armar query final
                sQuery += sSelect + sFrom + sWhere + sGroupBy;

                queryData.Query = sQuery;
                queryData.Columns = listaColumnas;

                return queryData;
            }



            /// <summary>
            /// Crea el query para realizar la consulta de los accionamientos.
            /// </summary>
            /// <param name="idCartera">id de cartera que se va a consultar.</param>
            /// <param name="idConsulta">id de la consulta de cuentas.</param>
            /// <param name="PorCuentas">Indica si la consulta será por número de accionamientos o número de cuentas.</param>
            /// <param name="Desde">Fecha a partir de que se genera la consulta.</param>
            /// <returns></returns>
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
            /// <summary>
            /// Crea el query para realizar la consulta de ofrecimientos de la cartera.
            /// </summary>
            /// <param name="idCartera">id de cartera que se va a consultar.</param>    
            /// <param name="Desde">Fecha desde para el periodo de la consulta.</param>
            /// <param name="Hasta">Fecha hasta para el periodo de la consulta.</param>
            /// <param name="idConsulta">id de la consulta de cuentas.</param>
            /// <returns></returns>
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
            /// <summary>
            /// Crea el query para realizar la consulta de búsquedas realizadas a las cuentas.
            /// </summary>
            /// <param name="idCartera">id de cartera que se va a consultar.</param>
            /// <param name="Desde">Fecha desde para el periodo de la consulta.</param>
            /// <param name="idConsulta">id de la consulta de cuentas.</param>
            /// <returns></returns>
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

            /// <summary>
            /// Crea el query para realizar la consulta de carteo devuelto.
            /// </summary>
            /// <param name="idCartera">id de cartera que se va a consultar.</param>
            /// <param name="Desde">Fecha desde para el periodo de la consulta.</param>
            /// <param name="idConsulta">id de la consulta de cuentas.</param>
            /// <returns></returns>

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


            /// <summary>
            /// Query para consultas VGP
            /// </summary>
            /// <param name="idCartera"></param>
            /// <param name="Desde"></param>
            /// <param name="Hasta"></param>
            /// <param name="idConsulta"></param>
            /// <returns></returns>
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
            /// <summary>
            /// Crea el query para realizar la consulta de pagos reportados realizadas a las cuentas.
            /// </summary>
            /// <param name="idCartera">id de cartera que se va a consultar.</param>
            /// <param name="Desde">Fecha desde para el periodo de la consulta.</param>
            /// <param name="idConsulta">id de la consulta de cuentas.</param>
            /// <returns></returns>
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