using Loki.DTOs.PlantillasCorreoDTOs;
using Loki.Mark.Consulta.PlantillasCorreo.Interfaces;
using CoorinWeb.Loki.Global;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore; 
using System;
using System.Data;
using System.Threading.Tasks; 

namespace Loki.Mark.Consulta.PlantillasCorreo.DAOs
{
    public class PlantillasCorreoDao : IPlantillasCorreoDao
    {
        private readonly IDbContextFactory _dbContFactory;
        private readonly ILogger<PlantillasCorreoDao> _logger;

        public PlantillasCorreoDao(IDbContextFactory dbContFactory, ILogger<PlantillasCorreoDao> logger)
        {
            _dbContFactory = dbContFactory;
            _logger = logger;

        }
        public async Task<bool> ActualizarPlantillaAsync(PlantillaCorreoDto plantilla, string servidor, string nombreBaseDatos)
        {
            try
            {
                string sQueryActualiza = @"
            UPDATE dbo.PlantillasCorreo 
            SET Mensaje = @Mensaje, 
                Nombre = @Nombre, 
                Asunto = @Asunto,
                idProducto = @IdProducto
            WHERE idCorreoScript = @IdCorreoScript";

                var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos);
                var connection = dbContext.Database.GetDbConnection();

                using var command = connection.CreateCommand();
                command.CommandText = sQueryActualiza;
                command.CommandType = CommandType.Text;

                command.Parameters.Add(new SqlParameter("@Mensaje", plantilla.Mensaje ?? (object)DBNull.Value));
                command.Parameters.Add(new SqlParameter("@Nombre", plantilla.Nombre));
                command.Parameters.Add(new SqlParameter("@Asunto", plantilla.Asunto));
                command.Parameters.Add(new SqlParameter("@IdProducto", plantilla.IdProducto ?? (object)DBNull.Value));
                command.Parameters.Add(new SqlParameter("@IdCorreoScript", plantilla.IdCorreoScript));

                if (connection.State != ConnectionState.Open)
                    await connection.OpenAsync();

                int rowsAffected = await command.ExecuteNonQueryAsync();

                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error actualizando plantilla: {ex.Message}");
                return false;
            }
        }

        public async Task<int> InsertarPlantillaAsync(PlantillaCorreoInsert plantilla, string servidor, string nombreBaseDatos)
        {
            try
            {
                string sqlInsert = @"
            INSERT INTO dbo.PlantillasCorreo (
                idProducto, 
                Descripción, 
                Nombre, 
                Asunto, 
                Mensaje, 
                Fecha_Insert, 
                idEjecutivo_Insert
            )
            VALUES (
                @IdProducto, 
                '', 
                @Nombre, 
                @Asunto, 
                @Mensaje, 
                GETDATE(), 
                @IdEjecutivo
            );
            SELECT CAST(SCOPE_IDENTITY() AS INT);";

                var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos);
                var connection = dbContext.Database.GetDbConnection();

                using var command = connection.CreateCommand();
                command.CommandText = sqlInsert;
                command.CommandType = CommandType.Text;

                command.Parameters.Add(new SqlParameter("@IdProducto", plantilla.IdProducto ?? (object)DBNull.Value));
                command.Parameters.Add(new SqlParameter("@Nombre", plantilla.Nombre));
                command.Parameters.Add(new SqlParameter("@Asunto", plantilla.Asunto));
                command.Parameters.Add(new SqlParameter("@Mensaje", plantilla.Mensaje));
                command.Parameters.Add(new SqlParameter("@IdEjecutivo", plantilla.IdEjecutivo));

                if (connection.State != ConnectionState.Open)
                    await connection.OpenAsync();
                var newId = await command.ExecuteScalarAsync();
                int id = Convert.ToInt32(newId);
                return id;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error insertando plantilla: {ex.Message}");
                return -1;
            }
        }

        public async Task<bool> EliminarPlantillaAsync(int idCorreoScript, string servidor, string nombreBaseDatos)
        {
            try
            {
                string sEliminaPlantilla = "DELETE FROM PlantillasCorreo WHERE idCorreoScript = @idCorreoScript";

                // Usar el servidor y base de datos dinámicos
                var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos);
                var connection = dbContext.Database.GetDbConnection();

                using var command = connection.CreateCommand();
                command.CommandText = sEliminaPlantilla;
                command.CommandType = CommandType.Text;
                command.Parameters.Add(new SqlParameter("@idCorreoScript", idCorreoScript));

                if (connection.State != ConnectionState.Open)
                    await connection.OpenAsync();

                int rowsAffected = await command.ExecuteNonQueryAsync();

                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                // Log del error
                Console.WriteLine($"Error eliminando plantilla: {ex.Message}");
                return false;
            }
        }

        //carga datos
        public async Task<List<PlantillaCorreoDto>> ObtenerPlantillasPorProducto(int idProducto, string servidor, string nombreBaseDatos)
        {
            try
            {
                string query = @"
            SELECT idCorreoScript, Nombre, Asunto, Mensaje 
            FROM dbo.PlantillasCorreo 
            WHERE idProducto = @IdProducto";

                var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos);
                var connection = dbContext.Database.GetDbConnection();

                using var command = connection.CreateCommand();
                command.CommandText = query;
                command.CommandType = CommandType.Text;
                command.Parameters.Add(new SqlParameter("@IdProducto", idProducto));

                if (connection.State != ConnectionState.Open)
                    await connection.OpenAsync();

                var plantillas = new List<PlantillaCorreoDto>();
                using var reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    plantillas.Add(new PlantillaCorreoDto
                    {
                        IdCorreoScript = reader.GetInt16(0),
                        Nombre = reader.GetString(1),
                        Asunto = reader.GetString(2),
                        Mensaje = reader.GetString(3)
                    });
                }

                return plantillas;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error obteniendo plantillas por producto");
                return new List<PlantillaCorreoDto>();
            }
        }

        public async Task<bool> VerificarTablaProducto(int idProducto, string servidor, string nombreBaseDatos)
        {
            try
            {
                string query = @"
            SELECT COUNT(*) 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = 'Y' 
            AND TABLE_NAME = @TableName";

                string tableName = $"Producto_{idProducto}";

                var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos);
                var connection = dbContext.Database.GetDbConnection();

                using var command = connection.CreateCommand();
                command.CommandText = query;
                command.CommandType = CommandType.Text;
                command.Parameters.Add(new SqlParameter("@TableName", tableName));

                if (connection.State != ConnectionState.Open)
                    await connection.OpenAsync();

                var result = (int)await command.ExecuteScalarAsync();
                return result > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verificando tabla producto");
                return false;
            }
        }

        public async Task<Dictionary<string, object>> ObtenerEjemploProducto(int idProducto, string servidor, string nombreBaseDatos)
        {
            try
            {
                string tableName = $"Producto_{idProducto}";
                string query = $"SELECT TOP 1 * FROM [Y].[{tableName}]";

                var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos);
                var connection = dbContext.Database.GetDbConnection();

                using var command = connection.CreateCommand();
                command.CommandText = query;
                command.CommandType = CommandType.Text;

                if (connection.State != ConnectionState.Open)
                    await connection.OpenAsync();

                using var reader = await command.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    var resultado = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        resultado[reader.GetName(i)] = reader.GetValue(i);
                    }
                    return resultado;
                }

                return new Dictionary<string, object>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error obteniendo ejemplo de producto");
                return new Dictionary<string, object>();
            }
        }

        public async Task<Dictionary<string, object>> ObtenerEjemploCuenta(int idCartera, string servidor, string nombreBaseDatos)
        {
            try
            {
                string query = @"
            SELECT TOP 1 NombreDeudor, RFC, NúmeroCliente, Saldo 
            FROM dbo.Cuentas 
            WHERE idCartera = @IdCartera";

                var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos);
                var connection = dbContext.Database.GetDbConnection();

                using var command = connection.CreateCommand();
                command.CommandText = query;
                command.CommandType = CommandType.Text;
                command.Parameters.Add(new SqlParameter("@IdCartera", idCartera));

                if (connection.State != ConnectionState.Open)
                    await connection.OpenAsync();

                using var reader = await command.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    var resultado = new Dictionary<string, object>();

                    // Agregar cada columna al diccionario
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        string columnName = reader.GetName(i);
                        object value = reader.GetValue(i);

                        if (value == DBNull.Value)
                            value = null;

                        resultado[columnName] = value;
                    }

                    return resultado;
                }

                return new Dictionary<string, object>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error obteniendo ejemplo de cuenta");
                return new Dictionary<string, object>();
            }
        }
    }
}