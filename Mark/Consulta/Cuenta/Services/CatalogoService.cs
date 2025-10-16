using CoorinWeb.Loki.Global;
using System.Data;
using Microsoft.Data.SqlClient;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using System.Collections;

namespace Loki.Mark.Consulta.Cuenta.Services
{
    public class CatalogosService : ICatalogosServiceRe
    {
        private readonly IDbContextFactory _dbContFactory;
        private const string TipoBase = "Collection";
        private static readonly DataSet _dsTablas = new DataSet();
        public DataSet ObtenerDataSet() => _dsTablas;
        public CatalogosService(IDbContextFactory dbContFactory)
        {
            _dbContFactory = dbContFactory;
        }

        //public  async Task<bool> ActualizaTodosCatálogosAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase, bool chkSanta = true)
        //{
        //    try
        //    {
        //        bool cargaCarteras = await CargarCarterasProductosAsync(dbContextFactory, servidor, tipoBase);
        //        bool cargaCatalogos = await CargarCatalogosAsync(dbContextFactory, servidor, tipoBase);
        //        bool cargaVersiones = await CargarVersionamientoAsync(dbContextFactory, servidor, tipoBase);

        //        if (!cargaCarteras || !cargaCatalogos || !cargaVersiones)
        //        {
        //           // Console.WriteLine($"Falló al obtener información fundamental para la aplicación. Id de error: {_idLogError:N0}");
        //            return false; // El llamador puede decidir mostrar mensaje o cerrar la app
        //        }

        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error al actualizar catálogos: {ex.Message}");
        //        return false;
        //    }
        //}

        public async Task<bool> CargarCarterasProductosAsync(string servidor, string tipoBase)
        {
            try
            {
                using var conn = _dbContFactory.GetSqlConnection(servidor, tipoBase);

                // Rechazo
                var tblRechazo = await EjecutarConsultaAsync(conn, "SELECT * FROM Rechazo", "Rechazo");
                tblRechazo.PrimaryKey = new DataColumn[] { tblRechazo.Columns["idMotivos"] };
                tblRechazo.DefaultView.Sort = "Tipo";
                _dsTablas.Tables.Add(tblRechazo);

                // Carteras
                var tblCarteras = await EjecutarConsultaAsync(conn, "SELECT * FROM vw_CarterasActivas", "Carteras");
                tblCarteras.PrimaryKey = new DataColumn[] { tblCarteras.Columns["idCartera"] };
                tblCarteras.DefaultView.Sort = "Cartera";
                _dsTablas.Tables.Add(tblCarteras);

                // Productos
                var tblProductos = await EjecutarConsultaAsync(conn, "SELECT * FROM dbCollection..vw_CarterasProductos", "Productos");
                tblProductos.PrimaryKey = new DataColumn[] { tblProductos.Columns["idProducto"] };
                tblProductos.DefaultView.Sort = "Producto";
                _dsTablas.Tables.Add(tblProductos);

                // Relación Carteras-Productos
                if (_dsTablas.Relations["CarterasProducto"] == null)
                {
                    var drCarterasProducto = new DataRelation(
                        "CarterasProducto",
                        tblCarteras.Columns["idCartera"],
                        tblProductos.Columns["idCartera"],
                        false
                    );
                    _dsTablas.Relations.Add(drCarterasProducto);
                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al cargar catálogos: {ex.Message}");
                return false;
            }
        }
        public async Task<DataTable> EjecutarConsultaAsync(SqlConnection conn, string query, string nombreTabla)
        {
            var dt = new DataTable(nombreTabla);
            using var cmd = new SqlCommand(query, conn);
            using var da = new SqlDataAdapter(cmd);

            if (conn.State != ConnectionState.Open)
                await conn.OpenAsync();

            da.Fill(dt);
            return dt;
        }



        public async Task<bool> CargarCatalogosAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase)
        {
            try
            {
                using var conn = dbContextFactory.GetSqlConnection(servidor, tipoBase);

                // --- 1. Catálogos ---
                var tblCatalogos = await EjecutarConsultaAsync(conn, "SELECT * FROM Catálogos", "Catálogos");
                tblCatalogos.PrimaryKey = new DataColumn[] { tblCatalogos.Columns["idCatálogo"] };
                _dsTablas.Tables.Add(tblCatalogos);

                // --- 2. Valores de Catálogo ---
                var tblValores = await EjecutarConsultaAsync(conn,
                    "SELECT idValor, idCatálogo, Valor, Detalle, Orden FROM ValoresCatálogo",
                    "ValoresCatálogo");

                tblValores.PrimaryKey = new DataColumn[] { tblValores.Columns["idValor"] };

                // Elimina fila con idValor = 0 si existe
                var rowToRemove = tblValores.Rows.Find(0);
                if (rowToRemove != null)
                    tblValores.Rows.Remove(rowToRemove);

                _dsTablas.Tables.Add(tblValores);

                // --- Relación Catálogos -> Valores ---
                if (_dsTablas.Relations["Catálogos"] == null)
                {
                    var drCatalogos = new DataRelation(
                        "Catálogos",
                        tblCatalogos.Columns["idCatálogo"],
                        tblValores.Columns["idCatálogo"],
                        false
                    );
                    _dsTablas.Relations.Add(drCatalogos);
                }

                // --- 3. Relaciones ---
                var tblRelaciones = await EjecutarConsultaAsync(conn, "SELECT * FROM vw_Relaciones", "RelacionesCatálogos");
                tblRelaciones.PrimaryKey = new DataColumn[] { tblRelaciones.Columns["idValor1"], tblRelaciones.Columns["idValor2"] };
                _dsTablas.Tables.Add(tblRelaciones);

                // --- Relaciones (FK) entre Valores y Relaciones ---
                if (_dsTablas.Relations["Relación1"] == null)
                {
                    var drRel1 = new DataRelation(
                        "Relación1",
                        tblValores.Columns["idValor"],
                        tblRelaciones.Columns["idValor1"],
                        false
                    );
                    _dsTablas.Relations.Add(drRel1);
                }

                if (_dsTablas.Relations["Relación2"] == null)
                {
                    var drRel2 = new DataRelation(
                        "Relación2",
                        tblValores.Columns["idValor"],
                        tblRelaciones.Columns["idValor2"],
                        false
                    );
                    _dsTablas.Relations.Add(drRel2);
                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al cargar catálogos: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// Carga base UsuariosRH.
        /// 


        public  async Task<DataTable> CargarUsuariosRHAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase, string usuarioRH)
        {
            var dtUsuariosRH = new DataTable("UsuariosRH");

            try
            {
                using var conn = dbContextFactory.GetSqlConnection(servidor, tipoBase);

                // --- 1. Obtener idEjecutivo ---
                const string queryId = @"
                SELECT idEjecutivo 
                FROM dbCollection..Ejecutivos 
                WHERE LOWER(Usuario) = LOWER(@Usuario)";

                int idEjecutivo = 0;
                Console.WriteLine($"idEjecutivo encontrado para '{usuarioRH}': {idEjecutivo}");


                using (var cmd = new SqlCommand(queryId, conn))
                {
                    cmd.Parameters.AddWithValue("@Usuario", usuarioRH);

                    await conn.OpenAsync();
                    var result = await cmd.ExecuteScalarAsync();
                    idEjecutivo = result != null ? Convert.ToInt32(result) : 0;
                }

                if (idEjecutivo == 0)
                {
                    Console.WriteLine($"⚠ No se encontró idEjecutivo para el usuario {usuarioRH}");
                    return dtUsuariosRH; // regresa tabla vacía
                }

                // --- 2. Obtener datos de Usuarios RH ---
                const string queryUsuarios = "SELECT IdEjecutivo AS Num_Empleado, Nombreejecutivo AS Nombre_Ejecutivo FROM [dbCollection].[dbo].[fn_Encuesta2da] (@IdEjecutivo)";

                using (var cmd = new SqlCommand(queryUsuarios, conn))
                {
                    cmd.Parameters.AddWithValue("@IdEjecutivo", idEjecutivo);

                    using var da = new SqlDataAdapter(cmd);
                    da.Fill(dtUsuariosRH);
                }

                return dtUsuariosRH;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al cargar usuarios RH: {ex.Message}");
                return dtUsuariosRH;
            }
        }
        /// <summary>
        /// Reporte de antunez y solo quiere vista para evidencia
        /// 
        public  async Task<DataTable> CargarEvidenciaAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase)
        {
            var dtEvidencia = new DataTable("Evidencia");

            try
            {
                using var conn = dbContextFactory.GetSqlConnection(servidor, tipoBase);

                const string query = "SELECT * FROM dbCollection..AsistenciaSEPT2A ORDER BY ord ASC";

                using var cmd = new SqlCommand(query, conn);
                using var da = new SqlDataAdapter(cmd);

                await conn.OpenAsync();
                da.Fill(dtEvidencia);

                return dtEvidencia;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al cargar evidencia: {ex.Message}");
                return dtEvidencia; // devuelve tabla vacía si hay error
            }
        }
        public  async Task<bool> CargarVersionamientoAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase)
        {
            try
            {
                using var conn = dbContextFactory.GetSqlConnection(servidor, tipoBase);

                const string query = @"
                    SELECT 
                        Fecha, 
                        CONCAT(Mayor, '.', Minor, '.', Build) AS Versión, 
                        Descripción 
                    FROM Versionamiento 
                    WHERE Aplicación = 'Coorin'";

                var tblVersiones = await EjecutarConsultaAsync(conn, query, "Versionamiento");

                tblVersiones.DefaultView.Sort = "Fecha DESC, Versión DESC";
                tblVersiones.TableName = "Versionamiento";

                _dsTablas.Tables.Add(tblVersiones);

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al cargar versionamiento: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// Obtiene las columnas de la tabla producto.
        /// </summary>
        /// <param name="idProducto">id del producto.</param>
        /// 
        public async Task CargarColumnasProductoAsync(
      IDbContextFactory dbContextFactory,
      string servidor,
      string tipoBase,
      int idProducto) // Cambiado de object a int
        {
            if (idProducto <= 0) return;

            string tableName = $"Producto_{idProducto}";

            using var conn = dbContextFactory.GetSqlConnection(servidor, tipoBase);

            string query = @"
SELECT LOWER(name) AS name 
FROM dbCollection.sys.columns 
WHERE object_id = OBJECT_ID('Y.' + @TableName)";

            using var cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@TableName", tableName);

            if (conn.State != ConnectionState.Open)
                await conn.OpenAsync();

            var dt = new DataTable(tableName);
            using var da = new SqlDataAdapter(cmd);
            da.Fill(dt);

            // Solo agregar si hay columnas
            if (dt.Columns.Contains("name") && dt.Rows.Count > 0)
            {
                dt.DefaultView.Sort = "name";
                dt.DefaultView.RowFilter = "name <> 'idcuenta'";
                dt = dt.DefaultView.ToTable();

                if (_dsTablas.Tables.Contains(tableName))
                    _dsTablas.Tables.Remove(tableName);

                _dsTablas.Tables.Add(dt);
            }
        }

        /// <summary>
        /// Obtiene una hashtable con los catálogos y valores que se relacionan con el id.
        /// </summary>        
        /// <param name="idValor2">Id que se buscará en la relación</param>
        /// <returns>HashTable con el nombre del catálogo y el valor.</returns>
        /// 
        public Hashtable RelacionesCatalogo(int idValor2)
        {
            var htRelaciones = new Hashtable();

            try
            {
                // Validar existencia de la tabla y relación
                if (!_dsTablas.Tables.Contains("ValoresCatálogo") ||
                    !_dsTablas.Relations.Contains("Relación2"))
                    return htRelaciones;

                var tblValores = _dsTablas.Tables["ValoresCatálogo"];
                var rowBase = tblValores.Rows.Find(idValor2);

                if (rowBase == null)
                    return htRelaciones;

                // Obtener las filas hijas de la relación "Relación2"
                DataRow[] drFilas = rowBase.GetChildRows("Relación2");

                foreach (DataRow fila in drFilas)
                {
                    string key = fila["idValor1"].ToString() ?? string.Empty;
                    string value = fila["Valor1"].ToString() ?? string.Empty;

                    if (!htRelaciones.ContainsKey(key))
                        htRelaciones.Add(key, value);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener relaciones del catálogo: {ex.Message}");
            }

            return htRelaciones;
        }


        /// <summary>
        /// Devuelve un string con la lista de los ids separados por comas. 
        /// </summary>
        /// <param name="idValor2">idValor 2 de la relación</param>
        /// <returns></returns>
        /// 
        public  string IdsRelaciones(int idValor2)
        {
            try
            {
                // Reutiliza el método RelacionesCatalogo
                Hashtable htRelaciones =  RelacionesCatalogo(idValor2);

                if (htRelaciones.Count == 0)
                    return string.Empty;

                // Une todos los ids separados por coma
                string sIds = string.Join(",", htRelaciones.Keys.Cast<string>());

                return sIds;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener ids de relaciones: {ex.Message}");
                return string.Empty;
            }
        }
        /* Funciones */

        /// <summary>
        /// Devuelve una tabla con valores sí y no como si fuera un catálogo.
        /// </summary>
        /// <returns></returns>
        /// 
        public DataTable TablaBit()
        {
            var tblBit = new DataTable("Bit");

            // Definir columnas
            tblBit.Columns.Add("idValor", typeof(int));
            tblBit.Columns.Add("Valor", typeof(string));

            // Agregar filas
            tblBit.Rows.Add(1, "Sí");
            tblBit.Rows.Add(0, "No");

            return tblBit;
        }
        /// <summary>
        /// Devuelve una tabla con los valores del catálogo.
        /// </summary>
        /// <param name="Catálogo">Nombre del catálogo</param>
        /// <returns></returns>
        /// 
        public  DataTable ValoresDelCatalogo(string nombreCatalogo)
        {
            var tblValores = new DataTable();

            try
            {
                // Validar existencia de la tabla de catálogos
                if (!_dsTablas.Tables.Contains("Catálogos"))
                    return tblValores;

                // Buscar filas por nombre del catálogo
                DataRow[] drFilas = _dsTablas.Tables["Catálogos"].Select($"Catálogo = '{nombreCatalogo}'");

                if (drFilas.Length == 1)
                {
                    DataRow[] childRows = drFilas[0].GetChildRows("Catálogos");

                    if (childRows.Length > 0)
                        tblValores = childRows.CopyToDataTable();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener valores del catálogo '{nombreCatalogo}': {ex.Message}");
            }

            return tblValores;
        }

        /// <summary>
        /// Devuelve una tabla con los valores del catálogo.
        /// </summary>
        /// <param name="idCatálogo">id del catálogo</param>
        /// <returns></returns>
        /// 
        public DataTable ValoresDelCatalogo(int idCatalogo)
        {
            var tblValores = new DataTable();

            try
            {
                // Validar existencia de la tabla y fila
                if (!_dsTablas.Tables.Contains("Catálogos"))
                    return tblValores;

                var filaCat = _dsTablas.Tables["Catálogos"].Rows.Find(idCatalogo);
                if (filaCat == null)
                    return tblValores;

                // Obtener filas hijas
                var childRows = filaCat.GetChildRows("Catálogos");
                if (childRows.Length > 0)
                {
                    tblValores = childRows.CopyToDataTable();
                    tblValores.DefaultView.Sort = "Orden";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener valores del catálogo id {idCatalogo}: {ex.Message}");
            }

            return tblValores;
        }
        /// <summary>
        /// Devuelve una tabla con los valores del catálogo 1 relacionados con el valor 2.
        /// </summary>
        /// <param name="idCatálogo1">id del catálogo 1</param>
        /// <param name="idValor2Relación">id del valor de la relación</param>
        /// <returns></returns>
        /// 
        public  DataTable ValoresDelCatalogo(int idCatalogo1, int idValor2Relacion)
        {
            var tblRelacion = new DataTable();

            try
            {
                // Validar existencia de tablas
                if (!_dsTablas.Tables.Contains("ValoresCatálogo") || !_dsTablas.Tables.Contains("RelacionesCatálogos"))
                    return tblRelacion;

                tblRelacion = _dsTablas.Tables["ValoresCatálogo"].Clone(); // copiar estructura

                // Filtrar relaciones por idValor2
                DataRow[] drRelaciones = _dsTablas.Tables["RelacionesCatálogos"].Select($"idValor2 = {idValor2Relacion}");
                foreach (var drRelacion in drRelaciones)
                {
                    // Obtener los valores padre a través de la relación "Relación1"
                    DataRow[] drValores = drRelacion.GetParentRows("Relación1");
                    foreach (var drValor in drValores)
                    {
                        if (Convert.ToInt32(drValor["idCatálogo"]) == idCatalogo1)
                        {
                            tblRelacion.ImportRow(drValor);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener valores del catálogo id {idCatalogo1} relacionado con idValor2 {idValor2Relacion}: {ex.Message}");
            }

            return tblRelacion;
        }

        /// <summary>
        /// Devuelve una tabla con los nombres de las columnas de la tabla Producto.
        /// </summary>
        /// <param name="idProducto">id del producto</param>
        /// <returns></returns>
        /// 
        public async Task<DataTable> ProductoColumnasAsync(
     IDbContextFactory dbContextFactory,
     string servidor,
     string tipoBase,
     int idProducto)
        {
            try
            {
                // Llamamos al método asíncrono que carga columnas
                await CargarColumnasProductoAsync(dbContextFactory, servidor, tipoBase, idProducto);

                string nombreProducto = $"Producto_{idProducto}";

                if (_dsTablas.Tables.Contains(nombreProducto))
                    return _dsTablas.Tables[nombreProducto];

                return new DataTable();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener columnas de producto: {ex.Message}");
                return new DataTable();
            }
        }
        /// <summary>
        /// Devuelve el 
        /// ra del producto.
        /// </summary>
        /// <param name="idProducto">idProducto</param>
        /// <returns></returns>
        /// 
        public int IdCartera(int idProducto)
        {
            try
            {
                if (!_dsTablas.Tables.Contains("Productos"))
                    return 0;

                DataRow drProducto = _dsTablas.Tables["Productos"].Rows.Find(idProducto);
                if (drProducto != null && drProducto["idCartera"] != DBNull.Value)
                    return Convert.ToInt32(drProducto["idCartera"]);

                return 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener idCartera del producto {idProducto}: {ex.Message}");
                return 0;
            }
        }

        /// <summary>
        /// Devuelve el nombre de la Cartera a través de su id.
        /// </summary>
        /// <param name="idCartera">idCartera</param>
        /// <returns></returns>
        /// 

        public static string Cartera(int idCartera)
        {
            try
            {
                if (!_dsTablas.Tables.Contains("Carteras"))
                    return string.Empty;

                DataRow drCartera = _dsTablas.Tables["Carteras"].Rows.Find(idCartera);
                if (drCartera != null && drCartera["Cartera"] != DBNull.Value)
                    return drCartera["Cartera"].ToString();

                return string.Empty;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener el nombre de la cartera {idCartera}: {ex.Message}");
                return string.Empty;
            }
        }


        /// <summary>
        /// Devuelve el nombre del Producto a través de su id.
        /// </summary>
        /// <param name="idCartera">idCartera</param>
        /// <returns></returns>
        /// 

        public static string Producto(int idProducto)
        {
            try
            {
                if (!_dsTablas.Tables.Contains("Productos"))
                    return string.Empty;

                DataRow drProducto = _dsTablas.Tables["Productos"].Rows.Find(idProducto);
                if (drProducto != null && drProducto["Producto"] != DBNull.Value)
                    return drProducto["Producto"].ToString();

                return string.Empty;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener el nombre del producto {idProducto}: {ex.Message}");
                return string.Empty;
            }
        }


        /// <summary>
        /// Devuelve una lista con todos los id de los productos correspondientes a la cartera.
        /// </summary>
        /// <param name="idCartera">id de la cartera.</param>
        /// <returns></returns>
        /// 

        public static string IdProductos(int idCartera)
        {
            try
            {
                if (!_dsTablas.Tables.Contains("Productos"))
                    return "0";

                var productos = _dsTablas.Tables["Productos"].AsEnumerable()
                    .Where(dr => dr["idCartera"] != DBNull.Value && Convert.ToInt32(dr["idCartera"]) == idCartera)
                    .Select(dr => dr["idProducto"].ToString());

                return productos.Any() ? string.Join(",", productos) : "0";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener productos de la cartera {idCartera}: {ex.Message}");
                return "0";
            }
        }

        /// <summary>
        /// Devuelve el valor del catálogo respecto a su idValor.
        /// </summary>
        /// <param name="idValor">idValor a buscar</param>
        /// <returns></returns>
        /// 

        public string Valor(int idValor)
        {
            try
            {
                if (!_dsTablas.Tables.Contains("ValoresCatálogo"))
                    return string.Empty;

                DataRow drValor = _dsTablas.Tables["ValoresCatálogo"].Rows.Find(idValor);
                if (drValor != null && drValor["Valor"] != DBNull.Value)
                    return drValor["Valor"].ToString();

                return string.Empty;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener el valor del idValor {idValor}: {ex.Message}");
                return string.Empty;
            }
        }

    }
}

