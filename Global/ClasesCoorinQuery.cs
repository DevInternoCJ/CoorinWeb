using System;
using System.Collections;
using System.Data;
using System.Linq; // Necesario para Linq si usas .Any() o similar
using CoorinWeb.Loki.Common;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using DocumentFormat.OpenXml.Office.SpreadSheetML.Y2023.MsForms;
using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using Loki.Global;
//using Loki.Mark.Administracion.Gespa.Catalogos.Services;
using Loki.Mark.Consulta.Cuenta.Services;
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
    public enum OperacionConsulta
    {
        Insert,
        Update,
        Delete,
        Error
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
                dtConsultas.Columns.Add("NombreConsulta", typeof(string));
                dtConsultas.Columns.Add("Desde", typeof(DateTime));
                dtConsultas.Columns.Add("idEjecutivo_Insert", typeof(int));
                dtConsultas.PrimaryKey = new DataColumn[] { dtConsultas.Columns["idConsulta"] };

                //// Filas hardcodeadas por defecto
                //dtConsultas.Rows.Add(1, 101, 1);
                //dtConsultas.Rows.Add(2, 102, 24);

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
            public async Task<OperacionConsulta> GuardarConsulta(
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

                    string sNombreConsulta = nombre?.Replace("'", "") ?? "";

                    // Inicializar DataTables locales si no existen
                    if (!_Consultas.Tables.Contains("Consultas"))
                    {
                        var dt = new DataTable("Consultas");
                        dt.Columns.Add("idConsulta", typeof(int));
                        dt.Columns.Add("idProducto", typeof(object));
                        dt.Columns.Add("idCartera", typeof(object));
                        dt.Columns.Add("NombreConsulta", typeof(string));
                        dt.Columns.Add("Desde", typeof(DateTime));
                        dt.Columns.Add("idEjecutivo_Insert", typeof(int));
                        dt.PrimaryKey = new DataColumn[] { dt.Columns["idConsulta"] };
                        _Consultas.Tables.Add(dt);
                    }

                    if (!_Consultas.Tables.Contains("Parámetros"))
                    {
                        var dt = new DataTable("Parámetros");
                        dt.Columns.Add("idConsulta", typeof(int));
                        dt.Columns.Add("Concepto", typeof(string));
                        dt.Columns.Add("Campo", typeof(string));
                        dt.Columns.Add("Valores", typeof(string));
                        dt.Columns.Add("Parámetros", typeof(string));
                        dt.Columns.Add("Dato", typeof(string));
                        _Consultas.Tables.Add(dt);
                    }

                    if (!_Consultas.Tables.Contains("Agrupar"))
                    {
                        var dt = new DataTable("Agrupar");
                        dt.Columns.Add("idConsulta", typeof(int));
                        dt.Columns.Add("Campo", typeof(string));
                        dt.Columns.Add("Concepto", typeof(string));
                        dt.Columns.Add("Origen", typeof(string));
                        _Consultas.Tables.Add(dt);
                    }

                    var tblConsultas = _Consultas.Tables["Consultas"];
                    var tblParametros = _Consultas.Tables["Parámetros"];
                    var tblAgrupar = _Consultas.Tables["Agrupar"];

                    // Verificar si ya existe por nombre
                    var drExist = tblConsultas.Select($"NombreConsulta = '{sNombreConsulta}'");
                    if (drExist.Length == 1)
                        idConsulta = Convert.ToInt32(drExist[0]["idConsulta"]);

                    // DELETE 
                    if (idConsulta != 0 && string.IsNullOrWhiteSpace(sNombreConsulta))
                    {
                        await conn.ExecuteAsync("DELETE FROM Consultas WHERE idConsulta = @idConsulta;", new { idConsulta });
                        var rowToDelete = tblConsultas.Rows.Find(idConsulta);
                        rowToDelete?.Delete();
                        tblConsultas.AcceptChanges();
                        return OperacionConsulta.Delete;
                    }

                    // INSERT
                    if (!string.IsNullOrEmpty(sNombreConsulta))
                    {
                        if (!parametros.Columns.Contains("idConsulta"))
                            parametros.Columns.Add("idConsulta", typeof(int));
                        if (!agrupar.Columns.Contains("idConsulta"))
                            agrupar.Columns.Add("idConsulta", typeof(int));

                        string sQuery = @"
                        INSERT INTO Consultas (idEjecutivo_Insert, NombreConsulta, idProducto, idCartera, Desde)
                        VALUES (@idEjecutivo, @Nombre, @idProducto, @idCartera, @Desde);
                        DECLARE @idConsulta INT = SCOPE_IDENTITY();";

                        // INSERT Agrupar
                        if (agrupar.Rows.Count > 0)
                        {
                            sQuery += "\nINSERT INTO ConsultaAgrupar (idConsulta, Campo, Concepto) VALUES ";
                            for (int i = 0; i < agrupar.Rows.Count; i++)
                            {
                                sQuery += $"(@idConsulta, '{agrupar.Rows[i]["Campo"]?.ToString().Replace("'", "''")}', '{agrupar.Rows[i]["Concepto"]?.ToString().Replace("'", "''")}')";
                                if (i < agrupar.Rows.Count - 1) sQuery += ",";
                            }
                            sQuery += ";";
                        }

                        // INSERT Parámetros
                        if (parametros.Rows.Count > 0)
                        {
                            sQuery += "\nINSERT INTO ConsultaParámetros (idConsulta, Concepto, Campo, Valores, Parámetros, Dato) VALUES ";
                            for (int i = 0; i < parametros.Rows.Count; i++)
                            {
                                sQuery += $"(@idConsulta, " +
                                          $"'{parametros.Rows[i]["Concepto"]?.ToString().Replace("'", "''")}', " +
                                          $"'{parametros.Rows[i]["Campo"]?.ToString().Replace("'", "''")}', " +
                                          $"N'{parametros.Rows[i]["Valores"]?.ToString().Replace("'", "''")}', " +
                                          $"N'{parametros.Rows[i]["Parámetros"]?.ToString().Replace("'", "''")}', " +
                                          $"'{parametros.Rows[i]["Dato"]?.ToString().Replace("'", "''")}')";
                                if (i < parametros.Rows.Count - 1) sQuery += ",";
                            }
                            sQuery += ";";
                        }

                        sQuery += "\nSELECT @idConsulta;";

                        var paramInsert = new
                        {
                            idEjecutivo,
                            Nombre = sNombreConsulta,
                            idProducto = idProducto ?? DBNull.Value,
                            idCartera = idCartera ?? DBNull.Value,
                            Desde = desde
                        };

                        int newId = await conn.ExecuteScalarAsync<int>(sQuery, paramInsert);

                        // Actualizar DataTables locales
                        foreach (DataRow row in agrupar.Rows)
                            row["idConsulta"] = newId;
                        foreach (DataRow row in parametros.Rows)
                            row["idConsulta"] = newId;

                        tblAgrupar.Clear();
                        tblParametros.Clear();
                        foreach (DataRow row in agrupar.Rows)
                            tblAgrupar.ImportRow(row);
                        foreach (DataRow row in parametros.Rows)
                            tblParametros.ImportRow(row);

                        // Agregar o actualizar consulta
                        var existingRow = tblConsultas.Rows.Find(newId);
                        if (existingRow != null)
                        {
                            existingRow["idProducto"] = idProducto ?? DBNull.Value;
                            existingRow["idCartera"] = idCartera ?? DBNull.Value;
                            existingRow["NombreConsulta"] = sNombreConsulta;
                            existingRow["Desde"] = desde;
                            existingRow["idEjecutivo_Insert"] = idEjecutivo;
                            tblConsultas.AcceptChanges();
                            return OperacionConsulta.Update;
                        }
                        else
                        {
                            var newRow = tblConsultas.NewRow();
                            newRow["idConsulta"] = newId;
                            newRow["idProducto"] = idProducto ?? DBNull.Value;
                            newRow["idCartera"] = idCartera ?? DBNull.Value;
                            newRow["NombreConsulta"] = sNombreConsulta;
                            newRow["Desde"] = desde;
                            newRow["idEjecutivo_Insert"] = idEjecutivo;
                            tblConsultas.Rows.Add(newRow);
                            tblConsultas.AcceptChanges();
                            return OperacionConsulta.Insert;
                        }
                    }

                    return OperacionConsulta.Error;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error GuardarConsulta: {ex.Message}");
                    return OperacionConsulta.Error;
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

                //string sQuery = "SELECT \r\n",
                //       sSelect = Conteo == Resultado.Detalle
                //           ? "\t.idCuenta Cuenta, Car.Abreviación + CONVERT(VARCHAR(10),C.Expediente) \r\n"
                //           : "\t COUNT(C.idCuenta) AS 'Cuentas', ISNULL(SUM(C.Saldo) ,0) AS 'Saldo' \r\n",
                //       sFrom = " FROM dbCollection..Cuentas C WITH (NOLOCK) \r\n",
                //       sWhere = " WHERE C.CuentaActiva = 1 AND C.idCartera = " + idCartera + (idProducto == null ? "" : " AND C.idProducto = " + idProducto) + " \r\n",
                //       sGroupBy = "";
                string sQuery = "SELECT \r\n",
                     sSelect = Conteo == Resultado.Detalle
                       ? "\tC.idCuenta AS Cuenta, Car.Abreviación + CONVERT(VARCHAR(10),C.Expediente) AS Expediente \r\n"
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
                    string valores = drFila["Valores"].ToString();
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

                            //if (drFila["Dato"].ToString() == "char")
                            //    sWhere += "\tAND ISNULL(Y.[" + campo + "], '') " + sNot + " IN (" + valores.Replace("=", "'").Replace("≠", "'").Replace(",", "',") + "') \r\n";
                            if (drFila["Dato"].ToString() == "char")
                            {
                                // Si los valores ya vienen formateados con comillas simples, usarlos directamente
                                if (valores.Contains("'"))
                                {
                                    sWhere += "\tAND ISNULL(Y.[" + campo + "], '') " + sNot + " IN (" + valores + ") \r\n";
                                }
                                else
                                {
                                    // Agregar comillas simples a cada valor
                                    var valoresArray = valores.Split(',');
                                    var valoresConComillas = string.Join(", ", valoresArray.Select(v => $"'{v.Trim()}'"));
                                    sWhere += "\tAND ISNULL(Y.[" + campo + "], '') " + sNot + " IN (" + valoresConComillas + ") \r\n";
                                }
                            }

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
                            {
                                // Extraer el operador y el valor
                                string operador = "=";
                                string valorFecha = val.Trim();

                                if (val.StartsWith(">=") || val.StartsWith("<=") || val.StartsWith("<>") || val.StartsWith("!="))
                                {
                                    operador = val.Substring(0, 2);
                                    valorFecha = val.Substring(2).Trim();
                                }
                                else if (val.StartsWith(">") || val.StartsWith("<") || val.StartsWith("="))
                                {
                                    operador = val.Substring(0, 1);
                                    valorFecha = val.Substring(1).Trim();
                                }

                                // Agregar comillas simples para fechas
                                sWhere += $"\tAND C.{col} {operador} '{valorFecha}'\r\n";
                            }
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
                            }
                            break;

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


            // Genrales
            /// <summary>
            /// Crea el query para realizar la consulta general de alguna tabla.
            /// </summary>
            /// <param name="idCartera">id de cartera que se va a consultar.</param>
            /// <param name="Concepto">Concepto que hace referencia a la tabla que se va a consultar.</param>
            /// <param name="tblParámetros">Tabla con parámetros.</param>
            /// <param name="tblAgrupar">Tabla con Agrupaciones.</param>
            /// <param name="Detalle">Indica si se desea conteo o detalles.</param>
            /// <param name="Desde">Fecha desde para el periodo de la consulta.</param>
            /// <param name="idConsulta">id de la consulta de cuentas.</param>
            /// <returns></returns>

            public async Task<string> QueryGeneral(string servidor, int idCartera, string concepto, DataTable tblParametros, DataTable tblAgrupar, Resultado conteo, DateTime desde, int idEjecutivo, int idConsulta)
            {
                //Variables auxiliares
                string telefono = "0", clase = "0", telefonica = "0", origen = "0", confirmado = "0", huso = "0",
                       entidad = "0", ultima = "0", sinConocido = "0", desconocido = "0", conocido = "0",
                       titulares = "0", calificacion = "0", estatusNego = "0", ranking = "0";

                string tipoHora = DateTime.Now.ToString("tt");
                int hora = Convert.ToInt32(DateTime.Now.ToString("hh"));
                string ConteoR = "0";

                ArrayList columnas = new ArrayList();
                //bool bConteosTels = false;
                //string sCaseHusoHorario = "";
                //string sNot = "";

                SqlQueryData squeryCuentas = QueryCuentas(idConsulta, ref columnas);

                string sQuery = " SELECT \r\n",

                 sSelect =
                     conteo == Resultado.Detalle ? "\t Z.idCuenta AS 'Cuenta' \r\n" :
                     conteo == Resultado.ContarCuentas ? "\t COUNT(DISTINCT Z.idCuenta) AS 'Cuentas' \r\n" :
                     "\t COUNT(*) AS '" + concepto + "' \r\n",

                 sFrom = " FROM dbCollection.." + concepto + " Z WITH (NOLOCK) \r\n",
                 sWhere = " WHERE Z.idCartera = " + idCartera + "  \r\n", //and ConteosTels.Fecha_Insert >= '" + Desde.ToString("yyyy-MM-dd") + "' --AQUI 


                 sGroupBy = ""

                ;

                if (idCartera == 28 && concepto == "Teléfonos" && (DateTime.Today.DayOfWeek == DayOfWeek.Sunday || DateTime.Today.DayOfWeek == DayOfWeek.Saturday))//aqui
                {
                    sWhere = sWhere.Replace("WHERE Z.idCartera = " + idCartera + " ", "WHERE Z.idCartera = " + idCartera + "  and Z.idOrigen in (1810,1811)");
                }

                bool bConteosTels = false;
                string sNot = "";
                string sCaseHusoHorario = "CASE \r\n" +
                                            "\t\t   WHEN MI.idTelefonía IS NULL THEN  Z.HusoHorario \r\n" +
                                            "\t\t   WHEN DATEDIFF(HH, GETDATE(), GETUTCDATE())  = 5 THEN MI.Verano \r\n" +
                                            "\t\t   ELSE MI.Invierno \r\n" +
                                            "\t END";


                //Condición especial fines de semana
                if (idCartera == 28 && concepto == "Teléfonos" &&
                    (DateTime.Today.DayOfWeek == DayOfWeek.Sunday || DateTime.Today.DayOfWeek == DayOfWeek.Saturday))
                {
                    sWhere += $" AND Z.idOrigen IN (1810,1811) ";
                }

                // Casos particulares
                if (concepto == "Teléfonos")
                {
                    sFrom += " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON Z.idCartera = CA.idCartera AND Z.idCuenta = CA.idCuenta AND CA.CuentaActiva = 1 \r\n";
                    //if (idCartera == 4 && Concepto=="Teléfonos")
                    //{
                    //    confirmado = "1";

                    //}
                    foreach (DataRow agrupar in tblAgrupar.Rows)
                    {
                        switch (agrupar["campo"].ToString())
                        {
                            case "Telefonía":
                                telefonica = "1";
                                break;
                            case "Clase":
                                clase = "1";
                                break;
                            case "Origen":
                                origen = "1";
                                break;
                            case "Confirmado":
                                confirmado = "1";
                                break;
                            case "EntidadFederativa":
                                entidad = "1";
                                break;
                            case "HusoHorario":
                                huso = "1";
                                break;
                            case "Teléfono":
                                telefono = "1";
                                break;
                            case "# SinContacto":
                                sinConocido = "1";
                                break;
                            case "# Desconocidos":
                                desconocido = "1";
                                break;
                            case "# Conocidos":
                                conocido = "1";
                                break;
                            case "# Titulares":
                                titulares = "1";
                                break;
                            case "ÚltimaMarcación":
                                ultima = "1";
                                break;
                            case "Calificacion":
                                calificacion = "1";
                                break;
                            case "EstatusNegociacion":
                                estatusNego = "1";
                                break;
                            case "Ranking":
                                ranking = "1";
                                break;
                        }
                    }
                    if (idCartera == 1 && telefono == "1" && clase == "1" && telefonica == "1" && origen == "1" && confirmado == "1" && huso == "1" && entidad == "1" && ultima == "1" && sinConocido == "1" && desconocido == "1" && conocido == "1" && titulares == "1")
                    {

                        if (hora >= 7 && hora < 9 && tipoHora == "a. m.")
                        {
                            sFrom += "\t INNER JOIN dbCollection.Y.Producto_1 P on Z.idCuenta=P.idCuenta \r\n";
                        }
                    }
                    if (conteo == Resultado.Detalle)
                        sSelect += "\t ,Z.NúmeroTelefónico AS 'Teléfono' \r\n " +
                                    "\t ,dbCollection.dbo.PrefijoMarcación(Z.NúmeroTelefónico, Z.idTelefonía) AS 'Marcación' \r\n ";
                }

                if (concepto == "Gestiones")
                {
                    sFrom = " FROM dbCollection..GestionesTelefónicas Z WITH (NOLOCK) \r\n";

                    sWhere += "\t AND Z.Fecha_Insert >= '" + desde.ToString("yyyy-MM-dd") + "' \r\n";
                }
                else if (concepto == "Negociaciones" || concepto == "Seguimientos")
                {
                    sWhere += "\t AND Z.Fecha_Insert >= '" + desde.ToString("yyyy-MM-dd") + "' \r\n";

                }
                else if (concepto == "Chats")
                {
                    sFrom = " FROM dbCollection..GestionesChat Z WITH (NOLOCK) \r\n";
                    sWhere += "\t AND Z.Fecha_Insert >= '" + desde.ToString("yyyy-MM-dd") + "' \r\n";
                }

                if (conteo == Resultado.Detalle)
                {
                    sSelect += "\t ,Carteras.Abreviación + CONVERT(VARCHAR(20), CA.Expediente) + '" + "' [Expediente], CA.NombreDeudor AS 'Nombre' \r\n ";
                    if (!sFrom.Contains("Cuentas CA"))
                        sFrom += " INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON Z.idCartera = CA.idCartera AND Z.idCuenta = CA.idCuenta \r\n";
                    if (!sFrom.Contains(" dbCollection..Carteras "))
                        sFrom += " INNER JOIN dbCollection..Carteras WITH (NOLOCK) ON Z.idCartera = Carteras.idCartera \r\n";
                }


                if (!string.IsNullOrEmpty(squeryCuentas.Query))
                    sFrom += "\tINNER JOIN ( \r\n " + squeryCuentas.Query + "\t) CC " +
                        "\r\n\t ON Z.idCartera = CC.idCartera AND Z.idCuenta = CC.idCuenta \r\n";
                using var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection");
                // === Nuevo bloque reemplazando idEjecutivosPropios(false) ===
                if (idConsulta == 0 && concepto != "Teléfonos" && concepto != "Correos")
                {
                    var ids = await ClasesCoorinMethods.GetIdEjecutivosPropiosAsync(connection, idEjecutivo, false);

                    if (ids != null && ids.Any())
                    {
                        string listaIds = string.Join(",", ids);
                        sWhere += $"\t AND Z.idEjecutivo IN ({listaIds}) \r\n";
                    }
                }


                #region Filtros
                if (tblParametros != null)
                {
                    foreach (DataRow drFila in tblParametros.Rows)
                    {
                        sNot = drFila["Valores"].ToString().Contains("≠") ? " NOT" : "";

                        switch (concepto)
                        {
                            case "Teléfonos":
                                {
                                    string sCampo = drFila["Campo"].ToString().Replace("# ", "");
                                    sNot = drFila["Valores"].ToString().Contains("≠") ? "NOT" : "";

                                    //Instancia de CatalogosService
                                    var catalogosService = new CatalogosService(_dbContextFactory);

                                    if (drFila["Campo"].ToString() == "Teléfono")
                                        sWhere += "\t AND Z.NúmeroTelefónico " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                    else if (drFila["Campo"].ToString() == "Clase")
                                        sWhere += "\t AND Z.idClase " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";
                                    else if (drFila["Campo"].ToString() == "Telefonía")
                                        sWhere += "\t AND Z.idTelefonía " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";
                                    else if (drFila["Campo"].ToString() == "Origen")
                                        sWhere += "\t AND Z.idOrígen " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";
                                    else if (drFila["Campo"].ToString() == "Confirmado")
                                        sWhere += "\t AND Z.Confirmado " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";
                                    else if (drFila["Campo"].ToString() == "EntidadFederativa")
                                        sWhere += "\t AND Z.Estado " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";
                                    else if (drFila["Campo"].ToString() == "EstatusNegociación")
                                        sWhere += "\t AND EstatusNegociación " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";//DUDA  GTNeg.NúmeroTelefónico

                                    else if (drFila["Campo"].ToString() == "HusoHorario")
                                    {
                                        for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                            sWhere += "\t AND " + sCaseHusoHorario + " " + drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',')[i] + "\r\n";

                                        if (!sFrom.Contains(" MarcaciónInternacional MI "))
                                            sFrom += "\t LEFT JOIN MarcaciónInternacional MI ON Z.idTelefonía = MI.idTelefonía AND MI.Clave = SUBSTRING(CONVERT(VARCHAR(20),Z.NúmeroTelefónico), 1,3) \r\n";

                                    }
                                    else if (sCampo == "HusoHorario")
                                    {
                                        var parametrosHuso = drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',');
                                        for (int i = 0; i < parametrosHuso.Length; i++)
                                            sWhere += $"\t AND {sCaseHusoHorario} {parametrosHuso[i]} \r\n";

                                        if (!sFrom.Contains("MarcaciónInternacional MI"))
                                            sFrom += "\t LEFT JOIN MarcaciónInternacional MI ON Z.idTelefonía = MI.idTelefonía AND MI.Clave = SUBSTRING(CONVERT(VARCHAR(20),Z.NúmeroTelefónico), 1,3) \r\n";
                                    }
                                    else if (sCampo == "MejorContacto")
                                    {
                                        if (!sFrom.Contains(") MC"))
                                        {
                                            sFrom += "\t LEFT JOIN ( \r\n\t\t\t" +
                                               "SELECT GT.NúmeroTelefónico, \r\n\t\t\t\t" +
                                        "GT.idContacto, \r\n\t\t\t\t" +
                                        "Contactos.Valor MejorContacto, \r\n\t\t\t\t" +
                                        "Contactos.Orden, \r\n\t\t\t\t" +
                                        "ROW_NUMBER() OVER (PARTITION BY GT.NúmeroTelefónico ORDER BY Contactos.Orden) NumMejorContacto \r\n\t\t\t" +
                                    "FROM GestionesTelefónicas GT WITH (NOLOCK) INNER JOIN ValoresCatálogo Contactos WITH (NOLOCK) ON GT.idContacto = Contactos.idValor \r\n\t\t\t" +
                                    "WHERE GT.Fecha_Insert >= '" + desde.ToString("yyyy-MM-dd") + "' AND GT.idCartera = " + idCartera + " \r\n\t\t\t" +
                                    ") MC \r\n\t\t\t\tON MC.NúmeroTelefónico = Z.NúmeroTelefónico AND MC.NumMejorContacto = 1 \r\n ";
                                            sWhere += "\t AND MC.idContacto " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";
                                        }

                                        //Se obtiene IDs relacionados mediante CatalogosService
                                        var idsRelacionados = await catalogosService.IdsRelacionesAsync(servidor, Convert.ToInt32(drFila["Parámetros"]));

                                        sWhere += $"\t AND MC.idContacto {sNot} IN ({idsRelacionados}) \r\n";
                                    }
                                    else if (sCampo == "Descolgaron_ViciDial" || sCampo == "Intentos_ViciDial")
                                    {
                                        if (!sFrom.Contains(") IVD"))
                                        
                                            sFrom += "\t LEFT JOIN ( \r\n\t\t\t" +
                                     "SELECT IV.NúmeroTelefónico, \r\n\t\t\t\t" +
                                         "SUM(Contestaron) Descolgaron_ViciDial, \r\n\t\t\t\t" +
                                         "COUNT(NúmeroTelefónico) Intentos_ViciDial \r\n\t\t\t" +
                                     "FROM Intentos_ViciDial IV  WITH (NOLOCK) INNER JOIN Equivalencias_ViciDial EV  WITH (NOLOCK) ON IV.Status_ViciDial = EV.Status_ViciDial \r\n\t\t\t" +
                                     "WHERE IV.Fecha_Insert >= '" + desde.ToString("yyyy-MM-dd") + "' \r\n\t\t\t" +
                                     "GROUP BY IV.NúmeroTelefónico ) IVD\r\n\t\t\t\tON IVD.NúmeroTelefónico = Z.NúmeroTelefónico \r\n ";
                                            for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                                sWhere += "\t AND ISNULL(IVD." + sCampo + ",0) " + drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',')[i] + "\r\n";

                                        
                                    }
                                    else if (sCampo == "Extensión")
                                    {
                                        sWhere += "\t AND Z.Extensión";
                                    }
                                    else
                                    {
                                        if (!bConteosTels)
                                        {
                                            var idsRelacionados = await catalogosService.IdsRelacionesAsync(servidor, 1103);

                                            sFrom += "\t LEFT JOIN ( \r\n" +
                                                "SELECT GT.idCuenta, GT.NúmeroTelefónico, " +
                                                $"SUM(CASE WHEN idContacto=1101 THEN 1 ELSE 0 END) AS 'Titulares', " +
                                                $"SUM(CASE WHEN idContacto=1102 THEN 1 ELSE 0 END) AS 'Conocidos', " +
                                              $"SUM(CASE WHEN idContacto IN ({idsRelacionados}) THEN 1 ELSE 0 END) AS 'Desconocidos', " +
                                               $"SUM(CASE WHEN idContacto NOT IN (1101,1102,{idsRelacionados}) THEN 1 ELSE 0 END) AS 'SinContacto', " +
                                                "MAX(Fecha_Insert) AS 'ÚltimaMarcación' " +
                                                "FROM dbCollection..GestionesTelefónicas GT WITH (NOLOCK) " +
                                                $"WHERE GT.idCartera = {idCartera} AND Fecha_Insert >= '{desde:yyyy-MM-dd}' " +
                                                "GROUP BY GT.idCuenta, GT.NúmeroTelefónico ) ConteosTels " +
                                                "ON ConteosTels.idCuenta = Z.idCuenta AND ConteosTels.NúmeroTelefónico = Z.NúmeroTelefónico \r\n";
                                            bConteosTels = true;
                                        }

                                        if (sCampo == "Municipio")
                                        {
                                            sWhere += $"\t AND Z.Municipio {sNot} IN ('{drFila["Parámetros"]}') \r\n";
                                        }
                                        else
                                        {
                                            var parametrosConteos = drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',');
                                            for (int i = 0; i < parametrosConteos.Length; i++)
                                                sWhere += $"\t AND ISNULL(ConteosTels.{sCampo},{(sCampo == "ÚltimaMarcación" ? "'1900-01-01'" : "0")}) {parametrosConteos[i]} \r\n";
                                        }
                                    }

                                    break;
                                }


                            case "Gestiones":
                                sNot = (drFila["Valores"].ToString().Contains("≠") ? " NOT" : "");

                                if (drFila["Campo"].ToString() == "Usuario")
                                {
                                    if (!sFrom.Contains("Ejecutivos E "))
                                        sFrom += "\t INNER JOIN dbCollection..Ejecutivos E WITH (NOLOCK) ON Z.idEjecutivo = E.idEjecutivo \r\n";
                                    sWhere += "\t AND E.Usuario " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                }
                                else if (drFila["Campo"].ToString() == "Teléfono")
                                    sWhere += "\t AND Z.NúmeroTelefónico " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                else if (drFila["Campo"].ToString() == "Extensión")
                                    sWhere += "\t AND Z.Extensión " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                else if (drFila["Campo"].ToString() == "Fecha")
                                    for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                        sWhere += "\t AND Z.Fecha_Insert " + drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',')[i] + "\r\n";

                                else if (drFila["Campo"].ToString() == "Hora")
                                    for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                        sWhere += "\t AND Z.Segundo_Insert " + drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',')[i] + "\r\n";

                                else if (drFila["Campo"].ToString() == "Duración" || drFila["Campo"].ToString() == "TiempoEnCuenta")
                                    for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                        sWhere += "\t AND Z." + drFila["Campo"] + " " + drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',')[i] + "\r\n";

                                else if (drFila["Campo"].ToString() == "Comentario" || drFila["Campo"].ToString() == "NombreContacto")
                                {
                                    for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                        sWhere += "\t AND Z." + drFila["Campo"] + " " + sNot + " LIKE " + drFila["Parámetros"].ToString().Split(',')[i] + "\r\n";

                                }
                                else // Catálogos
                                    sWhere += "\t AND Z.id" + drFila["Campo"] + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                break;
                            case "Negociaciones":
                                sNot = (drFila["Valores"].ToString().Contains("≠") ? " NOT" : "");

                                if (drFila["Campo"].ToString() == "Usuario" || drFila["Campo"].ToString() == "Validador")
                                {
                                    string sAlias = drFila["Campo"].ToString().Substring(0, 1);
                                    if (!sFrom.Contains("Ejecutivos " + sAlias))
                                        sFrom += "\t INNER JOIN dbCollection..Ejecutivos " + sAlias + " WITH (NOLOCK) ON Z.idEjecutivo" + (sAlias == "V" ? "Validador" : "") + " = " + sAlias + ".idEjecutivo \r\n";
                                    sWhere += "\t AND " + sAlias + ".Usuario " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                }
                                else if (drFila["Campo"].ToString() == "Fecha_Plazo")
                                {
                                    if (!sFrom.Contains("..Plazos L "))
                                        sFrom += "\t INNER JOIN dbCollection..Plazos L WITH (NOLOCK) ON Z.idCartera = L.idCartera AND Z.idCuenta = L.idCuenta AND Z.Fecha_Insert = L.Fecha_Insert AND Z.Segundo_Insert = L.Segundo_Insert \r\n";
                                    for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                        sWhere += "\t AND L.FechaPago " + drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',')[i] + "\r\n";

                                }
                                else if (drFila["Dato"].ToString() == "list")
                                {
                                    string sColumna = drFila["Campo"].ToString();
                                    if (sColumna == "Correo")
                                        sColumna = "CorreoElectrónico";
                                    if (sColumna == "Estado" || sColumna == "Herramienta")
                                        sColumna = "id" + sColumna;
                                    if (sColumna == "TipoNegociación" || sColumna == "Modo")
                                    {
                                        if (sColumna == "TipoNegociación")
                                            sWhere += "\t AND Acercamiento.idValor" + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";
                                        if (sColumna == "Modo")
                                            sWhere += "\t AND Modo.idValor" + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";
                                    }
                                    else
                                        sWhere += "\t AND Z." + sColumna + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                }
                                else
                                {
                                    string sColumna = drFila["Campo"].ToString();
                                    if (sColumna == "Hora")
                                        sColumna = "Segundo_Insert";
                                    if (sColumna == "FechaCreación")
                                        sColumna = "Fecha_Insert";

                                    for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                        sWhere += "\t AND Z." + sColumna + " " + drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',')[i] + "\r\n";
                                }

                                break;
                            case "Seguimientos":
                                sNot = (drFila["Valores"].ToString().Contains("≠") ? " NOT" : "");

                                if (drFila["Campo"].ToString() == "Usuario")
                                {
                                    if (!sFrom.Contains("Ejecutivos E "))
                                        sFrom += "\t INNER JOIN dbCollection..Ejecutivos E WITH (NOLOCK) ON Z.idEjecutivo = E.idEjecutivo \r\n";
                                    sWhere += "\t AND E.Usuario " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                }
                                else if (drFila["Campo"].ToString() == "Teléfono")
                                    sWhere += "\t AND Z.NúmeroTelefónico " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                else if (drFila["Dato"].ToString() == "list")
                                    sWhere += "\t AND Z." + drFila["Campo"] + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                else
                                {
                                    string sColumna = drFila["Campo"].ToString();
                                    if (drFila["Campo"].ToString() == "HoraCreación")
                                        sColumna = "Segundo_Insert";
                                    if (drFila["Campo"].ToString() == "FechaCreación")
                                        sColumna = "Fecha_Insert";
                                    if (drFila["Campo"].ToString() == "HoraSeguimiento")
                                        sColumna = "SegundoSeguimiento";

                                    for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                        sWhere += "\t AND Z." + sColumna + " " + drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',')[i] + "\r\n";
                                }
                                break;
                            case "Chats":
                                sNot = (drFila["Valores"].ToString().Contains("≠") ? " NOT" : "");

                                if (drFila["Campo"].ToString() == "Usuario")
                                {
                                    if (!sFrom.Contains("Ejecutivos E "))
                                        sFrom += "\t INNER JOIN dbCollection..Ejecutivos E WITH (NOLOCK) ON Z.idEjecutivo = E.idEjecutivo \r\n";
                                    sWhere += "\t AND E.Usuario " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                }
                                else if (drFila["Campo"].ToString() == "Teléfono")
                                    sWhere += "\t AND Z.NúmeroTelefónico " + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                else if (drFila["Campo"].ToString() == "Fecha")
                                    for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                        sWhere += "\t AND Z.Fecha_Insert " + drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',')[i] + "\r\n";

                                else if (drFila["Campo"].ToString() == "Hora")
                                    for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                        sWhere += "\t AND Z.Segundo_Insert " + drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',')[i] + "\r\n";

                                else if (drFila["Campo"].ToString() == "Duración")
                                    for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                        sWhere += "\t AND Z.Duración " + drFila["Parámetros"].ToString().Replace("≠", "<>").Split(',')[i] + "\r\n";

                                else if (drFila["Campo"].ToString() == "Comentario")
                                {
                                    for (int i = 0; i < drFila["Parámetros"].ToString().Split(',').Length; i++)
                                        sWhere += "\t AND Z.Comentario " + sNot + " LIKE " + drFila["Parámetros"].ToString().Split(',')[i] + "\r\n";

                                }
                                else if (drFila["Campo"].ToString() == "Salida")
                                    sWhere += "\t AND Z." + drFila["Campo"] + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";
                                else // Catálogos
                                    sWhere += "\t AND Z.id" + drFila["Campo"] + sNot + " IN (" + drFila["Parámetros"] + ") \r\n";

                                break;
                        }
                    }
                }
                #endregion

                #region Agrupar
                //------------------- #region Agrupar -------------------
                if (tblAgrupar != null)
                {
                    foreach (DataRow drFila in tblAgrupar.Rows)
                    {
                        string sCampo = drFila["Campo"].ToString().Replace("# ", "");
                        var catalogosService = new CatalogosService(_dbContextFactory);

                        switch (sCampo)
                        {
                            case "Teléfono":
                                sCampo = drFila["Campo"].ToString().Replace("# ", "");

                                if (drFila["Campo"].ToString() == "Teléfono")
                                {
                                    telefono = "1";
                                    sSelect += "\t ,Z.NúmeroTelefónico \r\n ";
                                    sGroupBy += "Z.NúmeroTelefónico, ";
                                }
                                else if (drFila["Campo"].ToString() == "Clase")
                                {
                                    clase = "1";
                                    sSelect += "\t ,Clase.Valor AS 'Clase' \r\n ";
                                    sFrom += "\t INNER JOIN dbCollection..ValoresCatálogo Clase ON Z.idClase = Clase.idValor \r\n";
                                    if (conteo == Resultado.Detalle)
                                    {
                                        sSelect += "\t ,EC.Usuario AS EjecutivoClasificó \r\n " +
                                                   "\t ,Z.FechaClasificación \r\n ";
                                        sFrom += "\t LEFT JOIN dbCollection..Ejecutivos EC ON Z.idEjecutivoClasificación = EC.idEjecutivo \r\n";
                                    }
                                    sGroupBy += "Clase.Valor, ";
                                }
                                else if (drFila["Campo"].ToString() == "Telefonía")
                                {
                                    telefonica = "1";
                                    sSelect += "\t ,Telefónia.Valor AS 'Telefónia' \r\n ";
                                    sFrom += "\t INNER JOIN dbCollection..ValoresCatálogo Telefónia ON Z.idTelefonía = Telefónia.idValor \r\n";
                                    sGroupBy += "Telefónia.Valor, ";
                                }
                                else if (drFila["Campo"].ToString() == "Origen")
                                {
                                    origen = "1";
                                    sSelect += "\t ,Origen.Valor AS 'Origen' \r\n ";
                                    sFrom += "\t INNER JOIN dbCollection..ValoresCatálogo Origen ON Z.idOrígen = Origen.idValor \r\n";
                                    if (conteo == Resultado.Detalle)
                                    {
                                        sSelect += "\t ,EO.Usuario AS EjecutivoAlta \r\n "
                                                + "\t ,Z.Fecha_Insert FechaAltaTeléfono \r\n ";
                                        sFrom += "\t LEFT JOIN dbCollection..Ejecutivos EO ON Z.idEjecutivo = EO.idEjecutivo AND EO.idEjecutivo > 1 \r\n";
                                    }

                                    sGroupBy += "Origen.Valor, ";
                                }
                                else if (drFila["Campo"].ToString() == "EstatusNegociación")
                                {
                                    estatusNego = "1";
                                    sSelect += "\t ,EstatusNegociación \r\n";
                                    sFrom += "\t LEFT JOIN (\r\n\t\t\t\t SELECT COUNT(*) EstatusNegociación, IdCuenta, NúmeroTelefónico FROM \r\n\t\t\t\t(\r\n\t\t\t\t SELECT idCartera, idCuenta,NúmeroTelefónico, Fecha_Insert,Segundo_Insert,idSituación \r\n\t\t\t\t FROM  dbCollection..GestionesTelefónicas \r\n\t\t\t\t WHERE idSituación = 1010 AND idCartera = " + idCartera + " \r\n\t\t\t\t UNION ALL \r\n\t\t\t\t SELECT idCartera, idCuenta,NúmeroTelefónico, Fecha_Insert,Segundo_Insert,idSituación \r\n\t\t\t\t FROM  dbCollection..GestionesChat \r\n\t\t\t\t WHERE idSituación = 1010 AND idCartera = " + idCartera + " \r\n\t\t\t\t) Gest GROUP BY IdCuenta, NúmeroTelefónico\r\n\t\t\t\t) GTNeg ON  Z.idCuenta = GTNeg.idCuenta AND Z.NúmeroTelefónico = GTNeg.NúmeroTelefónico\r\n";
                                    sGroupBy += "EstatusNegociación,";//aqui GTNeg.NúmeroTelefónico
                                }
                                else if (drFila["Campo"].ToString() == "Confirmado")
                                {
                                    confirmado = "1";
                                    sSelect += "\t ,CASE Z.Confirmado WHEN 1 THEN 'Sí' ELSE 'No' END AS 'Confirmado' \r\n ";
                                    sGroupBy += "Z.Confirmado, ";
                                }
                                else if (drFila["Campo"].ToString() == "HusoHorario")
                                {
                                    huso = "1";
                                    sSelect += "\t , " + sCaseHusoHorario + " AS [HusoHorario] \r\n ";
                                    sGroupBy += sCaseHusoHorario + ", ";
                                    if (!sFrom.Contains(" MarcaciónInternacional MI "))
                                        sFrom += "\t LEFT JOIN MarcaciónInternacional MI ON Z.idTelefonía = MI.idTelefonía AND MI.Clave = SUBSTRING(CONVERT(VARCHAR(20),Z.NúmeroTelefónico), 1,3) \r\n";

                                }
                                else if (drFila["Campo"].ToString() == "EntidadFederativa")
                                {
                                    entidad = "1";
                                    sSelect += "\t ,Z.Estado AS [EntidadFederativa] \r\n ";
                                    sGroupBy += "Z.Estado, ";

                                }
                                else if (drFila["Campo"].ToString() == "Extensión")
                                {
                                    sSelect += "\t ,Z.Extensión";
                                    sGroupBy += "Extensión,";
                                }
                                else if (drFila["Campo"].ToString() == "Calificacion" || drFila["Campo"].ToString() == "Ranking")
                                {

                                    if (drFila["Campo"].ToString() == "Calificacion")
                                    {
                                        calificacion = "1";
                                        sSelect += "\t ,TelComp.Calificacion AS Calificación \r\n ";
                                    }
                                    else
                                    {
                                        ranking = "1";
                                        sSelect += "\t ,TelComp.Ranking AS Ranking \r\n ";
                                    }
                                    if (ConteoR == "0")
                                    {
                                        ConteoR = "1";
                                        sFrom += "\t LEFT JOIN dbAllocation..TeléfonosComplemento  TelComp ON Z.idCartera=TelComp.IdCartera AND Z.IdCuenta=TelComp.IdCuenta AND Z.Númerotelefónico=TelComp.Númerotelefónico \r\n";
                                    }

                                    if (drFila["Campo"].ToString() == "Calificacion")
                                    {
                                        sGroupBy += "TelComp.Calificacion, ";
                                    }
                                    else
                                    {
                                        sGroupBy += "TelComp.Ranking, ";
                                    }

                                }

                                else if (sCampo == "Descolgaron_ViciDial" || sCampo == "Intentos_ViciDial")
                                {
                                    if (!sFrom.Contains(") IVD"))
                                        sFrom += "\t LEFT JOIN ( \r\n\t\t\t" +
                                            "SELECT IV.NúmeroTelefónico, \r\n\t\t\t\t" +
                                                "SUM(Contestaron) Descolgaron_ViciDial, \r\n\t\t\t\t" +
                                                "COUNT(NúmeroTelefónico) Intentos_ViciDial \r\n\t\t\t" +
                                            "FROM Intentos_ViciDial IV  WITH (NOLOCK) INNER JOIN Equivalencias_ViciDial EV  WITH (NOLOCK) ON IV.Status_ViciDial = EV.Status_ViciDial \r\n\t\t\t" +
                                            "WHERE IV.Fecha_Insert >= '" + desde.ToString("yyyy-MM-dd") + "' \r\n\t\t\t" +
                                            "GROUP BY IV.NúmeroTelefónico ) IVD\r\n\t\t\t\tON IVD.NúmeroTelefónico = Z.NúmeroTelefónico \r\n ";
                                    sSelect += "\t ,ISNULL(IVD." + sCampo + ",0) AS [" + drFila["Campo"] + "] \r\n ";
                                    sGroupBy += "ISNULL(IVD." + sCampo + ",0), \r\n";//Aqui

                                }
                                else
                                {
                                    var idsRelacionados1103 = await catalogosService.IdsRelacionesAsync(servidor, 1103);
                                    if (string.IsNullOrWhiteSpace(idsRelacionados1103))
                                        idsRelacionados1103 = "0"; // usa 0 u otro id que no exista; evita IN () inválido

                                    if (!bConteosTels)//
                                        sFrom += "\t LEFT JOIN ( \r\n" +
                                            "SELECT GT.idCuenta, GT.NúmeroTelefónico, \r\n\t\t\t" +
                                                "SUM( CASE WHEN idContacto=1101 THEN 1 ELSE 0 END  ) AS 'Titulares', \r\n\t\t\t\t" +
                                                "SUM( CASE WHEN idContacto=1102 THEN 1 ELSE 0 END  ) AS 'Conocidos', \r\n\t\t\t\t" +
                                                $"SUM(CASE WHEN idContacto IN ({idsRelacionados1103}) THEN 1 ELSE 0 END) AS 'Desconocidos', " +
                                                $"SUM(CASE WHEN idContacto NOT IN (1101,1102,{idsRelacionados1103}) THEN 1 ELSE 0 END) AS 'SinContacto', " +
                                                "MAX(Fecha_Insert) AS 'ÚltimaMarcación' \r\n\t\t\t\t" +
                                            "FROM (\r\n\t\t\t\t" +
                                            "SELECT idCuenta, idCartera, NúmeroTelefónico, idContacto, Fecha_Insert \r\n\t\t\t\t " +
                                            "FROM dbCollection..GestionesTelefónicas \r\n\t\t\t\t " +
                                            "WHERE idCartera = " + idCartera + " AND Fecha_Insert >= '" + desde.ToString("yyyy-MM-dd") + "' \r\n\t\t\t" +
                                            "UNION ALL \r\n\t\t\t" +
                                             "SELECT idCuenta, idCartera, NúmeroTelefónico, idContacto, Fecha_Insert \r\n\t\t\t\t " +
                                            "FROM dbCollection..GestionesChat \r\n\t\t\t\t " +
                                            "WHERE idCartera = " + idCartera + " AND Fecha_Insert >= '" + desde.ToString("yyyy-MM-dd") + "' \r\n\t\t\t" +
                                            ") GT \r\n\t\t\t" +
                                            "WHERE GT.idCartera = " + idCartera + " AND Fecha_Insert >= '" + desde.ToString("yyyy-MM-dd") + "' \r\n\t\t\t" +
                                            "GROUP BY GT.idCuenta, GT.NúmeroTelefónico ) ConteosTels\r\n\t\t\t\tON ConteosTels.idCuenta = Z.idCuenta AND ConteosTels.NúmeroTelefónico = Z.NúmeroTelefónico \r\n ";


                                    bConteosTels = true;
                                    if (sCampo == "ÚltimaMarcación")
                                    {
                                        ultima = "1";
                                        sSelect += "\t ,ConteosTels.ÚltimaMarcación \r\n ";
                                        sGroupBy += "ConteosTels.ÚltimaMarcación, ";
                                    }
                                    else if (sCampo == "Municipio")
                                    {                                                       //este else if es prueba para lo d municipio
                                        sSelect += "\t ,ISNULL(Z." + sCampo + ",0) AS [" + drFila["Campo"] + "] \r\n ";
                                        sGroupBy += "ISNULL(Z." + sCampo + ",0), \r\n ";//Aqui
                                    }
                                    else
                                    {
                                        if (sCampo == "SinContacto")
                                        {
                                            sinConocido = "1";
                                        }
                                        if (sCampo == "Desconocidos")
                                        {
                                            desconocido = "1";
                                        }
                                        if (sCampo == "Conocidos")
                                        {
                                            conocido = "1";
                                        }
                                        if (sCampo == "Titulares")
                                        {
                                            titulares = "1";
                                        }
                                        sSelect += "\t ,ISNULL(ConteosTels." + sCampo + ",0) AS [" + drFila["Campo"] + "] \r\n ";
                                        sGroupBy += "ISNULL(ConteosTels." + sCampo + ",0), \r\n  ";//aqui
                                    }
                                }

                                break;
                            case "Clase": clase = "1"; break;
                            case "Telefonía": telefonica = "1"; break;
                            case "Origen": origen = "1"; break;
                            case "Confirmado": confirmado = "1"; break;
                            case "HusoHorario": huso = "1"; break;
                            case "EntidadFederativa": entidad = "1"; break;
                            case "ÚltimaMarcación": ultima = "1"; break;
                            case "SinContacto": sinConocido = "1"; break;
                            case "Desconocidos": desconocido = "1"; break;
                            case "Conocidos": conocido = "1"; break;
                            case "Titulares": titulares = "1"; break;
                            case "Calificacion": calificacion = "1"; break;
                            case "EstatusNegociacion": estatusNego = "1"; break;
                            case "Ranking": ranking = "1"; break;
                        }
                    }
                }
                #endregion

                //Columnas de la consulta de cuentas.
                foreach (string sColumna in columnas)
                {
                    sSelect += "\t,CC.[" + sColumna + "]\r\n";
                    sGroupBy += "CC.[" + sColumna + "],";
                }

                if (sGroupBy.Length == 0 || conteo == Resultado.Detalle)
                    sGroupBy = "";
                else
                    sGroupBy = " GROUP BY " + sGroupBy.TrimEnd(new char[] { ',', ' ' });

                //Campañas - filas de trabajo.
                if (conteo == Resultado.FilaDeTrabajo)
                {
                    sSelect = "\t Z.idCartera, Z.idCuenta, Z.idEjecutivo " +
                               (concepto != "Negociaciones" ? ", Z.NúmeroTelefónico \r\n" : ", NULL AS [NúmeroTelefónico] \r\n");
                    sGroupBy = "";
                }

                using var connectionJer = _dbContextFactory.GetSqlConnection(servidor, "Collection");
                int jerarquia = await ClasesCoorinMethods.ObtenerJerarquiaEjecutivo(connectionJer, idEjecutivo);

                if (conteo == Resultado.Detalle && jerarquia < 3)
                {
                    if (idCartera == 1)
                        sSelect = sSelect.Replace(
                            "Z.idCuenta AS 'Cuenta'",
                            "STUFF(STUFF(Z.idCuenta,1,2,'XX'),13, 2,'XX') [Cuenta]"
                        );
                    else
                        sSelect = sSelect.Replace(
                            "Z.idCuenta AS 'Cuenta'",
                            "STUFF(Z.idCuenta,1,LEN(Z.idCuenta)-4,'XXX-XXX-') [Cuenta]"
                        );
                }


                if (idCartera == 1 && telefono == "1" && clase == "1" && telefonica == "1" &&
                    origen == "1" && confirmado == "1" && huso == "1" && entidad == "1" &&
                    ultima == "1" && sinConocido == "1" && desconocido == "1" &&
                    conocido == "1" && titulares == "1")
                {
                    if (hora >= 7 && hora < 9 && tipoHora == "a. m.")
                    {
                        sQuery += " " + sSelect + sFrom + sWhere +
                                  " and LEFT(P.recoveredcode,1)<>'7' and LEFT(P.recoveredcode,1)<>'8' " +
                                  "and LEFT(P.recoveredcode,1)<>'9' and Z.HusoHorario=0 " +
                                  "and Z.idTelefonía <>2104 and Z.idTelefonía<>2105 and Z.idTelefonía<>2106" +
                                  sGroupBy;
                    }
                    else
                    {
                        sQuery += " " + sSelect + sFrom + sWhere + sGroupBy;
                    }
                }
                else
                {
                    sQuery += " " + sSelect + sFrom + sWhere + sGroupBy;
                }

                if (idCartera == 24 && sQuery.Contains("Intentos_ViciDial"))
                    sQuery = sQuery.Replace("FROM Intentos_ViciDial", "FROM dbHistory.CFE.Intentos_ViciDial");

                ConteoR = "0";

                return sQuery;

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