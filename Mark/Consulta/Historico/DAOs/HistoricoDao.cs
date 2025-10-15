using CoorinWeb.Loki.Global;
using DocumentFormat.OpenXml.Spreadsheet;
using Loki.Mark.Consulta.Historico.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using static Loki.DTOs.HistoricoDTOs.Consulta;

namespace Loki.Mark.Consulta.Historico.DAOs
{
    public class HistoricoDao : IHistoricoDao
    {
        private readonly IDbContextFactory _dbContFactory;
        private readonly ILogger<HistoricoDao> _logger;

        public HistoricoDao(IDbContextFactory dbContFactory, ILogger<HistoricoDao> logger)
        {
            _dbContFactory = dbContFactory;
            _logger = logger;
        }

        public async Task<DataSet> BuscarCuentasIndividualAsync(string cuenta, ConsultaBaseRequest parametros, string servidor)
        {
            var dataSet = new DataSet();
            string nombreBaseDatos = "History";

            try
            {
                _logger.LogInformation($"Conectando a servidor: {servidor}, base de datos: {nombreBaseDatos}");
                _logger.LogInformation($"Parámetros iniciales: Cuenta='{cuenta}', IdCartera={parametros.IdCartera}, UsarPeriodo={parametros.UsarPeriodo}");

                using (var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos))
                {
                    var connection = dbContext.Database.GetDbConnection();
                    if (connection.State != ConnectionState.Open)
                        await connection.OpenAsync();

                    // --- CUENTA ---
                    if (parametros.IncluirCuenta)
                    {
                        var query = @"
                            SELECT * 
                            FROM dbHistory..vw_CuentasHistórico 
                            WHERE LTRIM(RTRIM(Cuenta)) = @idCuenta
                              AND idCartera = @idCartera";

                        var table = await EjecutarConsultaSimple(connection, query, cuenta, parametros, "Cuenta", ignorarPeriodo: true);
                        table.TableName = "Cuenta";
                        dataSet.Tables.Add(table);
                    }

                    // --- NEGOCIACIONES ---
                    if (parametros.IncluirNegociaciones)
                    {
                        var query = "SELECT * FROM dbHistory..vw_NegociacionesOfrecimientos WHERE LTRIM(RTRIM(Cuenta)) = @idCuenta AND idCartera = @idCartera";
                        if (parametros.UsarPeriodo)
                            query += " AND Fecha_Insert BETWEEN @Desde AND @Hasta";

                        var table = await EjecutarConsultaSimple(connection, query, cuenta, parametros, "Negociaciones");
                        table.TableName = "Negociaciones";
                        dataSet.Tables.Add(table);
                    }

                    // --- GESTIONES ---
                    if (parametros.IncluirGestiones)
                    {
                        var query = "SELECT * FROM dbHistory.dbo.vw_GestionesTelefónicas WHERE LTRIM(RTRIM(Cuenta)) = @idCuenta AND idCartera = @idCartera";
                        if (parametros.UsarPeriodo)
                            query += " AND Fecha BETWEEN @Desde AND @Hasta";

                        var table = await EjecutarConsultaSimple(connection, query, cuenta, parametros, "Gestiones");
                        table.TableName = "Gestiones";
                        dataSet.Tables.Add(table);
                    }

                    // --- VISITAS ---
                    if (parametros.IncluirVisitas)
                    {
                        var query = "SELECT * FROM dbHistory.dbo.vw_GestionesDomiciliarias WHERE LTRIM(RTRIM(Cuenta)) = @idCuenta AND idCartera = @idCartera";
                        if (parametros.UsarPeriodo)
                            query += " AND [Fecha Visita] BETWEEN @Desde AND @Hasta";

                        var table = await EjecutarConsultaSimple(connection, query, cuenta, parametros, "Visitas");
                        table.TableName = "Visitas";
                        dataSet.Tables.Add(table);
                    }

                    // --- ACCIONAMIENTOS ---
                    if (parametros.IncluirAccionamientos)
                    {
                        var query = "SELECT * FROM dbHistory.dbo.vw_Accionamientos WHERE LTRIM(RTRIM(Cuenta)) = @idCuenta AND idCartera = @idCartera";
                        if (parametros.UsarPeriodo)
                            query += " AND Fecha BETWEEN @Desde AND @Hasta";

                        var table = await EjecutarConsultaSimple(connection, query, cuenta, parametros, "Accionamientos");
                        table.TableName = "Accionamientos";
                        dataSet.Tables.Add(table);
                    }

                    // --- PAGOS ---
                    if (parametros.IncluirPagos)
                    {
                        string query;

                        if (parametros.IdCartera == 1)
                        {
                            query = "SELECT * FROM dbHistory.dbo.vw_PagosAmex WHERE LTRIM(RTRIM(idCuenta)) = @idCuenta AND idCartera = @idCartera";
                        }
                        else
                        {
                            query = "SELECT * FROM dbHistory.dbo.Pagos WHERE LTRIM(RTRIM(idCuenta)) = @idCuenta AND idCartera = @idCartera AND Fecha_insert >= '2023-04-09'";
                        }

                        if (parametros.UsarPeriodo)
                            query += " AND FechaPago BETWEEN @Desde AND @Hasta";

                        var tablePagos = await EjecutarConsultaSimple(connection, query, cuenta, parametros, "Pagos");
                        tablePagos.TableName = "Pagos";
                        dataSet.Tables.Add(tablePagos);
                    }
                }

                return dataSet;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en BuscarCuentasIndividualAsync");
                throw;
            }
        }

        public async Task<DataTable> EjecutarConsultaSimple(DbConnection connection, string query, string cuenta, ConsultaBaseRequest parametros, string tablaNombre, bool ignorarPeriodo = false)
        {
            using (var command = connection.CreateCommand())
            {
                command.CommandText = query;
                command.CommandTimeout = 1800;

                var paramCuenta = command.CreateParameter();
                paramCuenta.ParameterName = "@idCuenta";
                paramCuenta.Value = cuenta.Trim();
                command.Parameters.Add(paramCuenta);

                var paramCartera = command.CreateParameter();
                paramCartera.ParameterName = "@idCartera";
                paramCartera.Value = parametros.IdCartera;
                command.Parameters.Add(paramCartera);

                if (!ignorarPeriodo && parametros.UsarPeriodo && parametros.FechaDesde.HasValue && parametros.FechaHasta.HasValue)
                {
                    var paramDesde = command.CreateParameter();
                    paramDesde.ParameterName = "@Desde";
                    paramDesde.Value = parametros.FechaDesde.Value;
                    command.Parameters.Add(paramDesde);

                    var paramHasta = command.CreateParameter();
                    paramHasta.ParameterName = "@Hasta";
                    paramHasta.Value = parametros.FechaHasta.Value;
                    command.Parameters.Add(paramHasta);
                }

                // Construir query completa para debug con valores reales
                string queryDebug = query;
                queryDebug = queryDebug.Replace("@idCuenta", $"'{paramCuenta.Value}'");
                queryDebug = queryDebug.Replace("@idCartera", parametros.IdCartera.ToString());
                if (!ignorarPeriodo && parametros.UsarPeriodo && parametros.FechaDesde.HasValue && parametros.FechaHasta.HasValue)
                {
                    queryDebug = queryDebug.Replace("@Desde", $"'{parametros.FechaDesde.Value:yyyy-MM-dd HH:mm:ss}'");
                    queryDebug = queryDebug.Replace("@Hasta", $"'{parametros.FechaHasta.Value:yyyy-MM-dd HH:mm:ss}'");
                }

                _logger.LogInformation($"Ejecutando consulta tabla '{tablaNombre}': {queryDebug}");

                var dataTable = new DataTable();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    dataTable.Load(reader);
                }

                // Loguear primeras filas de la tabla (máximo 5 filas)
                if (dataTable.Rows.Count > 0)
                {
                    _logger.LogInformation($"Primeras filas de la tabla '{tablaNombre}':");
                    int filasAMostrar = Math.Min(5, dataTable.Rows.Count);
                    for (int i = 0; i < filasAMostrar; i++)
                    {
                        var fila = dataTable.Rows[i];
                        string filaStr = string.Join(" | ", dataTable.Columns.Cast<DataColumn>().Select(c => $"{c.ColumnName}='{fila[c]}'"));
                        _logger.LogInformation(filaStr);
                    }
                }
                else
                {
                    _logger.LogInformation($"Tabla '{tablaNombre}' está vacía.");
                }

                return dataTable;
            }
        }


        //historico archivo
        public async Task<DataSet> BuscarCuentasPorArchivoAsync(
     DataTable cuentas,
     ConsultaBaseRequest parametros,
     string servidor,
     string idEjecutivo)
        {
            var ds = new DataSet();
            string dbHistory = "History";

            try
            {
                using var dbContext = _dbContFactory.GetDbContext(servidor, dbHistory);
                var conn = dbContext.Database.GetDbConnection();
                if (conn.State != ConnectionState.Open)
                    await conn.OpenAsync();

                // Validar idEjecutivo
                if (string.IsNullOrWhiteSpace(idEjecutivo))
                    throw new UnauthorizedAccessException("idEjecutivo es requerido");

                // --- Crear tabla temporal PERSISTENTE en dbComplemento ---
                string tempTableName = $"HisCue_{idEjecutivo}";

                var createTemp = $@"
            IF EXISTS (SELECT 1 FROM dbComplemento.sys.tables WHERE name = '{tempTableName}' AND schema_id = 5) 
                DROP TABLE dbComplemento.Temp.{tempTableName};
            
            CREATE TABLE dbComplemento.Temp.{tempTableName} (
                Cuenta CHAR(16) COLLATE Modern_Spanish_BIN2 NOT NULL
            );
        ";

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = createTemp;
                    await cmd.ExecuteNonQueryAsync();
                }

                // --- Validar y limpiar datos antes del BulkCopy ---
                foreach (DataRow row in cuentas.Rows)
                {
                    if (row["Cuenta"] == DBNull.Value)
                        throw new Exception("Se encontró una fila con Cuenta vacía en el archivo.");

                    var cuenta = row["Cuenta"].ToString()?.Trim() ?? "";
                    cuenta = cuenta.Replace("\t", "").Replace("\r", "").Replace("\n", "");

                    if (string.IsNullOrEmpty(cuenta))
                        throw new Exception("Se encontró una Cuenta vacía después de limpiar caracteres.");

                    if (cuenta.Length > 16)
                        throw new Exception($"La cuenta '{cuenta}' excede la longitud máxima permitida (16).");

                    row["Cuenta"] = cuenta;
                }

                // --- Bulk insert ---
                using (var bulk = new SqlBulkCopy((SqlConnection)conn))
                {
                    bulk.DestinationTableName = $"dbComplemento.Temp.{tempTableName}";
                    bulk.BulkCopyTimeout = 30 * 60;
                    bulk.WriteToServer(cuentas);
                }

                // --- Queries dinámicas usando la tabla temporal persistente ---
                if (parametros.IncluirCuenta)
                {
                    var query = $@"
                SELECT DISTINCT GT.* 
                FROM dbHistory..vw_CuentasHistórico GT
                INNER JOIN dbComplemento.Temp.{tempTableName} HS
                    ON GT.idCartera = @idCartera
                    AND GT.Cuenta = HS.Cuenta";
                    ds.Tables.Add(await EjecutarConsultaAsync(conn, query, parametros, "Cuenta"));
                }

                if (parametros.IncluirNegociaciones)
                {
                    var query = $@"
                SELECT DISTINCT GT.* 
                FROM dbHistory..vw_NegociacionesOfrecimientos GT
                INNER JOIN dbComplemento.Temp.{tempTableName} HS
                    ON GT.idCartera = @idCartera
                    AND GT.Cuenta = HS.Cuenta";
                    if (parametros.UsarPeriodo)
                        query += " AND Fecha_Insert BETWEEN @Desde AND @Hasta";
                    ds.Tables.Add(await EjecutarConsultaAsync(conn, query, parametros, "Negociaciones"));
                }

                if (parametros.IncluirGestiones)
                {
                    var query = $@"
                SELECT DISTINCT GT.*
                FROM dbHistory.dbo.vw_GestionesTelefónicas GT
                INNER JOIN dbComplemento.Temp.{tempTableName} HS
                    ON GT.idCartera = @idCartera
                    AND GT.Cuenta = HS.Cuenta";
                    if (parametros.UsarPeriodo)
                        query += " AND Fecha BETWEEN @Desde AND @Hasta";
                    ds.Tables.Add(await EjecutarConsultaAsync(conn, query, parametros, "Gestiones"));
                }

                if (parametros.IncluirVisitas)
                {
                    var query = $@"
                SELECT DISTINCT GT.*
                FROM dbHistory.dbo.vw_GestionesDomiciliarias GT
                INNER JOIN dbComplemento.Temp.{tempTableName} HS
                    ON GT.idCartera = @idCartera
                    AND GT.Cuenta = HS.Cuenta";
                    if (parametros.UsarPeriodo)
                        query += " AND [Fecha Visita] BETWEEN @Desde AND @Hasta";
                    ds.Tables.Add(await EjecutarConsultaAsync(conn, query, parametros, "Visitas"));
                }

                if (parametros.IncluirAccionamientos)
                {
                    var query = $@"
                SELECT DISTINCT GT.*
                FROM dbHistory.dbo.vw_Accionamientos GT
                INNER JOIN dbComplemento.Temp.{tempTableName} HS
                    ON GT.idCartera = @idCartera
                    AND GT.Cuenta = HS.Cuenta";
                    if (parametros.UsarPeriodo)
                        query += " AND Fecha BETWEEN @Desde AND @Hasta";
                    ds.Tables.Add(await EjecutarConsultaAsync(conn, query, parametros, "Accionamientos"));
                }

                if (parametros.IncluirPagos)
                {
                    string query;
                    if (parametros.IdCartera == 1)
                    {
                        query = $@"
                    SELECT DISTINCT GT.* 
                    FROM dbHistory.dbo.vw_PagosAmex GT
                    INNER JOIN dbComplemento.Temp.{tempTableName} HS
                        ON GT.idCartera = @idCartera
                        AND GT.idCuenta = HS.Cuenta";
                    }
                    else
                    {
                        query = $@"
                    SELECT DISTINCT GT.*
                    FROM dbHistory.dbo.Pagos GT
                    INNER JOIN dbComplemento.Temp.{tempTableName} HS
                        ON GT.idCartera = @idCartera
                        AND GT.idCuenta = HS.Cuenta";
                    }
                    if (parametros.UsarPeriodo)
                        query += " AND FechaPago BETWEEN @Desde AND @Hasta";
                    ds.Tables.Add(await EjecutarConsultaAsync(conn, query, parametros, "Pagos"));
                }

                // Renombrar las tablas según las columnas
                foreach (DataTable tblDatos in ds.Tables)
                {
                    if (tblDatos.Columns.Contains("RFC"))
                        tblDatos.TableName = "Cuenta";
                    else if (tblDatos.Columns.Contains("Herramienta"))
                        tblDatos.TableName = "Negociaciones";
                    else if (tblDatos.Columns.Contains("NúmeroTelefónico"))
                        tblDatos.TableName = "Gestiones";
                    else if (tblDatos.Columns.Contains("Fecha Visita"))
                        tblDatos.TableName = "Visitas";
                    else if (tblDatos.Columns.Contains("Fecha"))
                        tblDatos.TableName = "Accionamientos";
                    else if (tblDatos.Columns.Contains("FechaPago"))
                        tblDatos.TableName = "Pagos";
                }

                // --- Limpiar tabla temporal ---
                try
                {
                    var dropTemp = $"DROP TABLE dbComplemento.Temp.{tempTableName}";
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = dropTemp;
                        await cmd.ExecuteNonQueryAsync();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "No se pudo eliminar la tabla temporal {TempTableName}", tempTableName);
                }

                return ds;
            }
            catch (Exception)
            {
                throw;
            }
        }

        private async Task<DataTable> EjecutarConsultaAsync(
            DbConnection conn,
            string query,
            ConsultaBaseRequest parametros,
            string tableName)
        {
            using var cmd = conn.CreateCommand();
            cmd.CommandText = query;
            cmd.CommandTimeout = 1800;

            var paramCartera = cmd.CreateParameter();
            paramCartera.ParameterName = "@idCartera";
            paramCartera.Value = parametros.IdCartera;
            cmd.Parameters.Add(paramCartera);

            if (parametros.UsarPeriodo)
            {
                var paramDesde = cmd.CreateParameter();
                paramDesde.ParameterName = "@Desde";
                paramDesde.Value = parametros.FechaDesde.Value;
                cmd.Parameters.Add(paramDesde);

                var paramHasta = cmd.CreateParameter();
                paramHasta.ParameterName = "@Hasta";
                paramHasta.Value = parametros.FechaHasta.Value;
                cmd.Parameters.Add(paramHasta);
            }

            var dt = new DataTable(tableName);
            using var reader = await cmd.ExecuteReaderAsync();
            dt.Load(reader);
            return dt;
        }


    }
}