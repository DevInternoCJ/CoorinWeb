using CoorinWeb.Loki.Global;
using Loki.Mark.Consulta.Histórico.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;
using static Loki.DTOs.HistoricoDTOs.Consulta;

namespace Loki.Mark.Consulta.Histórico.DAOs
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

                using (var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos))
                {
                    var connection = dbContext.Database.GetDbConnection();

                    if (connection.State != ConnectionState.Open)
                        await connection.OpenAsync();

                    if (parametros.IncluirCuenta)
                    {
                        var table = await EjecutarConsultaSimple(
                            connection,
                            "SELECT * FROM dbHistory..vw_CuentasHistórico WHERE Cuenta = @idCuenta AND idCartera = @idCartera",
                            cuenta, parametros);
                        table.TableName = "Cuenta";
                        dataSet.Tables.Add(table);
                        _logger.LogInformation($"Tabla Cuenta: {table.Rows.Count} registros");
                    }

                    if (parametros.IncluirNegociaciones)
                    {
                        var query = "SELECT * FROM dbHistory..vw_NegociacionesOfrecimientos WHERE Cuenta = @idCuenta AND idCartera = @idCartera";
                        if (parametros.UsarPeriodo)
                            query += " AND Fecha_Insert BETWEEN @Desde AND @Hasta";

                        var table = await EjecutarConsultaSimple(connection, query, cuenta, parametros);
                        table.TableName = "Negociaciones";
                        dataSet.Tables.Add(table);
                    }

                    if (parametros.IncluirGestiones)
                    {
                        var query = "SELECT * FROM dbHistory.dbo.vw_GestionesTelefónicas WHERE Cuenta = @idCuenta AND idCartera = @idCartera";
                        if (parametros.UsarPeriodo)
                            query += " AND Fecha BETWEEN @Desde AND @Hasta";

                        var table = await EjecutarConsultaSimple(connection, query, cuenta, parametros);
                        table.TableName = "Gestiones";
                        dataSet.Tables.Add(table);
                    }

                    if (parametros.IncluirVisitas)
                    {
                        var query = "SELECT * FROM dbHistory.[dbo].[vw_GestionesDomiciliarias] WHERE Cuenta = @idCuenta AND idCartera = @idCartera";
                        if (parametros.UsarPeriodo)
                            query += " AND [Fecha Visita] BETWEEN @Desde AND @Hasta";

                        var table = await EjecutarConsultaSimple(connection, query, cuenta, parametros);
                        table.TableName = "Visitas";
                        dataSet.Tables.Add(table);
                        _logger.LogInformation($"Tabla Visitas: {table.Rows.Count} registros");
                    }

                    if (parametros.IncluirAccionamientos)
                    {
                        var query = "SELECT * FROM dbHistory.[dbo].[vw_Accionamientos] WHERE Cuenta = @idCuenta AND idCartera = @idCartera";
                        if (parametros.UsarPeriodo)
                            query += " AND [Fecha] BETWEEN @Desde AND @Hasta";

                        var table = await EjecutarConsultaSimple(connection, query, cuenta, parametros);
                        table.TableName = "Accionamientos";
                        dataSet.Tables.Add(table);
                        _logger.LogInformation($"Tabla Accionamientos: {table.Rows.Count} registros");
                    }

                    if (parametros.IncluirPagos)
                    {
                        DataTable tablePagos;

                        bool vistaAmexExiste = await VistaExisteAsync(connection, "vw_PagosAmex");

                        if (vistaAmexExiste)
                        {
                            string query;
                            if (parametros.IdCartera == 1 || parametros.IdCartera == 31)
                            {
                                query = "SELECT * FROM dbHistory.[dbo].[vw_PagosAmex] WHERE idCuenta = @idCuenta AND idCartera = @idCartera";
                            }
                            else
                            {
                                query = "SELECT * FROM dbHistory.[dbo].[Pagos] WHERE idCuenta = @idCuenta AND idCartera = @idCartera AND Fecha_insert >= '2023-04-09'";
                            }

                            if (parametros.UsarPeriodo)
                                query += " AND FechaPago BETWEEN @Desde AND @Hasta";

                            tablePagos = await EjecutarConsultaSimple(connection, query, cuenta, parametros);
                            _logger.LogInformation($"Tabla Pagos: {tablePagos.Rows.Count} registros (usando vw_PagosAmex)");
                        }
                        else
                        {

                            _logger.LogWarning($"Vista vw_PagosAmex no existe en servidor {servidor}. Creando tabla informativa.");

                            tablePagos = new DataTable("Pagos");
                            tablePagos.Columns.Add("Informacion", typeof(string));
                            tablePagos.Columns.Add("Servidor", typeof(string));
                            tablePagos.Columns.Add("Estado", typeof(string));

                            DataRow row = tablePagos.NewRow();
                            row["Informacion"] = "Datos de pagos no disponibles";
                            row["Servidor"] = servidor;
                            row["Estado"] = "Vista vw_PagosAmex no existe en este servidor";
                            tablePagos.Rows.Add(row);
                        }

                        tablePagos.TableName = "Pagos";
                        dataSet.Tables.Add(tablePagos);
                    }
                }

                _logger.LogInformation($"DataSet completado con {dataSet.Tables.Count} tablas");
                return dataSet;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en BuscarCuentasIndividualAsync");
                throw;
            }
        }

        private async Task<bool> VistaExisteAsync(DbConnection connection, string nombreVista, string esquema = "dbo")
        {
            try
            {
                string query = @"
                    SELECT COUNT(*) 
                    FROM INFORMATION_SCHEMA.VIEWS 
                    WHERE TABLE_SCHEMA = @esquema 
                    AND TABLE_NAME = @nombreVista";

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = query;

                    var paramEsquema = command.CreateParameter();
                    paramEsquema.ParameterName = "@esquema";
                    paramEsquema.Value = esquema;
                    command.Parameters.Add(paramEsquema);

                    var paramNombreVista = command.CreateParameter();
                    paramNombreVista.ParameterName = "@nombreVista";
                    paramNombreVista.Value = nombreVista;
                    command.Parameters.Add(paramNombreVista);

                    var resultado = await command.ExecuteScalarAsync();
                    return Convert.ToInt32(resultado) > 0;
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, $"Error al verificar existencia de vista {nombreVista}. Asumiendo que no existe.");
                return false; // Si hay error, asumir que no existe
            }
        }

        private async Task<DataTable> EjecutarConsultaSimple(DbConnection connection, string query, string cuenta, ConsultaBaseRequest parametros)
        {
            try
            {
                _logger.LogInformation($"Ejecutando query: {query}");
                _logger.LogInformation($"Parámetros: Cuenta={cuenta}, Cartera={parametros.IdCartera}, UsarPeriodo={parametros.UsarPeriodo}");

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = query;
                    command.CommandTimeout = 1800;

                    // Agregar parámetros básicos
                    var paramCuenta = command.CreateParameter();
                    paramCuenta.ParameterName = "@idCuenta";
                    paramCuenta.Value = cuenta;
                    command.Parameters.Add(paramCuenta);

                    var paramCartera = command.CreateParameter();
                    paramCartera.ParameterName = "@idCartera";
                    paramCartera.Value = parametros.IdCartera;
                    command.Parameters.Add(paramCartera);

                    //SOLO AGREGAR PARÁMETROS DE FECHA SI UsarPeriodo ES TRUE
                    if (parametros.UsarPeriodo && parametros.FechaDesde.HasValue && parametros.FechaHasta.HasValue)
                    {
                        _logger.LogInformation($"Agregando parámetros de fecha: Desde={parametros.FechaDesde}, Hasta={parametros.FechaHasta}");

                        var paramDesde = command.CreateParameter();
                        paramDesde.ParameterName = "@Desde";
                        paramDesde.Value = parametros.FechaDesde.Value;
                        command.Parameters.Add(paramDesde);

                        var paramHasta = command.CreateParameter();
                        paramHasta.ParameterName = "@Hasta";
                        paramHasta.Value = parametros.FechaHasta.Value;
                        command.Parameters.Add(paramHasta);
                    }
                    else
                    {
                        _logger.LogInformation("Omittingo parámetros de fecha (UsarPeriodo = false)");
                    }

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var dataTable = new DataTable();
                        dataTable.Load(reader);

                        // SI LA TABLA ESTÁ VACÍA, ASEGURAR QUE TENGA LA ESTRUCTURA CORRECTA
                        if (dataTable.Rows.Count == 0)
                        {
                            _logger.LogInformation("Tabla vacía, asegurando estructura de columnas");

                        }

                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en consulta: {query}");

                var tablaError = new DataTable();
                tablaError.Columns.Add("Error", typeof(string));
                tablaError.Columns.Add("Mensaje", typeof(string));

                DataRow row = tablaError.NewRow();
                row["Error"] = "Error en consulta";
                row["Mensaje"] = ex.Message;
                tablaError.Rows.Add(row);

                return tablaError;
            }
        }
        public async Task<DataSet> BuscarCuentasPorArchivoAsync(IEnumerable<string> cuentas, ConsultaBaseRequest parametros, string servidor)
        {
            var dataSet = new DataSet();
            var nombreTablaTemp = $"HisCue_{Guid.NewGuid().ToString("N")}";
            string nombreBaseDatos = "Collection";

            try
            {
                // Crear tabla temporal
                await CrearTablaTemporalAsync(nombreTablaTemp, servidor, nombreBaseDatos);

                // Insertar cuentas
                await InsertarCuentasTemporalAsync(nombreTablaTemp, cuentas, servidor, nombreBaseDatos);

                using (var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos))
                {
                    var connection = dbContext.Database.GetDbConnection();

                    if (connection.State != ConnectionState.Open)
                        await connection.OpenAsync();

                    var consulta = ConstruirConsultaArchivo(parametros, nombreTablaTemp);

                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = consulta;
                        command.CommandTimeout = 1800;

                        var paramCartera = command.CreateParameter();
                        paramCartera.ParameterName = "@idCartera";
                        paramCartera.Value = parametros.IdCartera;
                        command.Parameters.Add(paramCartera);

                        if (parametros.UsarPeriodo && parametros.FechaDesde.HasValue && parametros.FechaHasta.HasValue)
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

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            do
                            {
                                var dataTable = new DataTable();
                                dataTable.Load(reader);
                                dataSet.Tables.Add(dataTable);
                            } while (!reader.IsClosed && reader.NextResult());
                        }
                    }
                }

                return dataSet;
            }
            finally
            {
                // Limpiar tabla temporal
                await EliminarTablaTemporalAsync(nombreTablaTemp, servidor, nombreBaseDatos);
            }
        }

        private string ConstruirConsultaIndividual(ConsultaBaseRequest parametros)
        {
            var consulta = new StringBuilder();

            if (parametros.IncluirCuenta)
            {
                consulta.AppendLine("SELECT * FROM dbHistory..vw_CuentasHistórico WHERE Cuenta = @idCuenta AND idCartera = @idCartera");
            }

            if (parametros.IncluirNegociaciones)
            {
                AddUnionIfNeeded(consulta);
                consulta.AppendLine("SELECT * FROM dbHistory..vw_NegociacionesOfrecimientos WHERE Cuenta = @idCuenta AND idCartera = @idCartera");
                if (parametros.UsarPeriodo)
                    consulta.AppendLine(" AND Fecha_Insert BETWEEN @Desde AND @Hasta");
            }

            if (parametros.IncluirGestiones)
            {
                AddUnionIfNeeded(consulta);
                consulta.AppendLine("SELECT * FROM dbHistory.dbo.vw_GestionesTelefónicas WHERE Cuenta = @idCuenta AND idCartera = @idCartera");
                if (parametros.UsarPeriodo)
                    consulta.AppendLine(" AND Fecha BETWEEN @Desde AND @Hasta");
            }

            if (parametros.IncluirVisitas)
            {
                AddUnionIfNeeded(consulta);
                consulta.AppendLine("SELECT * FROM dbHistory.[dbo].[vw_GestionesDomiciliarias] WHERE Cuenta = @idCuenta AND idCartera = @idCartera");
                if (parametros.UsarPeriodo)
                    consulta.AppendLine(" AND [Fecha Visita] BETWEEN @Desde AND @Hasta");
            }

            if (parametros.IncluirAccionamientos)
            {
                AddUnionIfNeeded(consulta);
                consulta.AppendLine("SELECT * FROM dbHistory.[dbo].[vw_Accionamientos] WHERE Cuenta = @idCuenta AND idCartera = @idCartera");
                if (parametros.UsarPeriodo)
                    consulta.AppendLine(" AND [Fecha] BETWEEN @Desde AND @Hasta");
            }

            if (parametros.IncluirPagos)
            {
                AddUnionIfNeeded(consulta);
                if (parametros.IdCartera == 1 || parametros.IdCartera == 31)
                {
                    consulta.AppendLine("SELECT * FROM dbHistory.[dbo].[vw_PagosAmex] WHERE idCuenta = @idCuenta AND idCartera = @idCartera");
                }
                else
                {
                    consulta.AppendLine("SELECT * FROM dbHistory.[dbo].[Pagos] WHERE idCuenta = @idCuenta AND idCartera = @idCartera AND Fecha_insert >= '2023-04-09'");
                }
                if (parametros.UsarPeriodo)
                    consulta.AppendLine(" AND FechaPago BETWEEN @Desde AND @Hasta");
            }

            return consulta.ToString();
        }

        private string ConstruirConsultaArchivo(ConsultaBaseRequest parametros, string nombreTablaTemp)
        {
            var consulta = new StringBuilder();

            if (parametros.IncluirCuenta)
            {
                consulta.AppendLine($"SELECT DISTINCT GT.* FROM dbHistory..vw_CuentasHistórico GT");
                consulta.AppendLine($"INNER JOIN dbComplemento.Temp.{nombreTablaTemp} HS ON GT.Cuenta = HS.Cuenta");
                consulta.AppendLine($"WHERE GT.idCartera = @idCartera");
            }

            if (parametros.IncluirNegociaciones)
            {
                AddUnionIfNeeded(consulta);
                consulta.AppendLine($"SELECT DISTINCT GT.* FROM dbHistory..vw_NegociacionesOfrecimientos GT");
                consulta.AppendLine($"INNER JOIN dbComplemento.Temp.{nombreTablaTemp} HS ON GT.Cuenta = HS.Cuenta");
                consulta.AppendLine($"WHERE GT.idCartera = @idCartera");
                if (parametros.UsarPeriodo)
                    consulta.AppendLine(" AND Fecha_Insert BETWEEN @Desde AND @Hasta");
            }

            // Agregar consultas similares para los demás tipos...

            return consulta.ToString();
        }

        public async Task<bool> CrearTablaTemporalAsync(string nombreTabla, string servidor, string nombreBaseDatos)
        {
            try
            {
                using (var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos))
                {
                    var connection = dbContext.Database.GetDbConnection();

                    if (connection.State != ConnectionState.Open)
                        await connection.OpenAsync();

                    var query = $@"
                        IF EXISTS (SELECT 1 FROM dbComplemento.sys.tables WHERE name = '{nombreTabla}' AND schema_id=5)
                            DROP TABLE dbComplemento.Temp.{nombreTabla};
                        
                        CREATE TABLE dbComplemento.Temp.{nombreTabla} (
                            Cuenta char(16) COLLATE Modern_Spanish_BIN2 NOT NULL
                        )";

                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = query;
                        return await command.ExecuteNonQueryAsync() > 0;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creando tabla temporal");
                return false;
            }
        }

        public async Task<bool> InsertarCuentasTemporalAsync(string nombreTabla, IEnumerable<string> cuentas, string servidor, string nombreBaseDatos)
        {
            try
            {
                using (var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos))
                {
                    var connection = dbContext.Database.GetDbConnection() as SqlConnection;

                    if (connection == null)
                        return false;

                    if (connection.State != ConnectionState.Open)
                        await connection.OpenAsync();

                    using (var bulkCopy = new SqlBulkCopy(connection))
                    {
                        bulkCopy.DestinationTableName = $"dbComplemento.Temp.{nombreTabla}";
                        bulkCopy.BulkCopyTimeout = 1800;

                        var table = new DataTable();
                        table.Columns.Add("Cuenta", typeof(string));

                        foreach (var cuenta in cuentas.Distinct())
                        {
                            table.Rows.Add(cuenta);
                        }

                        await bulkCopy.WriteToServerAsync(table);
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error insertando cuentas temporales");
                return false;
            }
        }

        public async Task<bool> EliminarTablaTemporalAsync(string nombreTabla, string servidor, string nombreBaseDatos)
        {
            try
            {
                using (var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos))
                {
                    var connection = dbContext.Database.GetDbConnection();

                    if (connection.State != ConnectionState.Open)
                        await connection.OpenAsync();

                    var query = $"DROP TABLE IF EXISTS dbComplemento.Temp.{nombreTabla}";

                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = query;
                        return await command.ExecuteNonQueryAsync() > 0;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error eliminando tabla temporal");
                return false;
            }
        }

        private void AddUnionIfNeeded(StringBuilder consulta)
        {
            if (consulta.Length > 0)
                consulta.AppendLine("UNION ALL");
        }
    }
}