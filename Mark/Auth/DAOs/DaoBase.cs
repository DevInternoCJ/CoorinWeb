using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Dynamic;

namespace CoorinWeb.Loki.Mark.Auth.DAOs
{
    public class DaoBase
    {
		/// <summary>
		/// Ejecuta una consulta de texto SQL (no un Stored Procedure) y mapea los resultados.
		/// </summary>
		public async Task<IEnumerable<T>> ExecuteQueryAsync<T>(SqlConnection connection, string sql, object? parameters = null)
		{
			if (connection.State != ConnectionState.Open)
			{
				await connection.OpenAsync();
			}

			// La única diferencia con los otros métodos es 'CommandType.Text'
			return await connection.QueryAsync<T>(
				sql,
				parameters,
				commandType: CommandType.Text
			);
		}

		public async Task<dynamic?> ExecuteStoredProcedure(DbContext context, string storedProcedureName, params SqlParameter[] parameters)
        {
            var result = new Dictionary<string, object>();
            var connection = context.Database.GetDbConnection();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = storedProcedureName;
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddRange(parameters);

                if (connection.State != ConnectionState.Open)
                    await connection.OpenAsync();

                using var reader = await command.ExecuteReaderAsync();
                if (await reader.ReadAsync())
                {
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        var nombreColumna = reader.GetName(i);
                        var valor = await reader.IsDBNullAsync(i) ? null : reader.GetValue(i);
                        result[nombreColumna] = valor;
                    }
                }
            }

            return result;
        }

        public async Task<List<dynamic>?> ExecuteStoredProcedure(SqlConnection sqlConnection, string storedProcedureName, params SqlParameter[] parameters)
        {
            // Crear un DynamicParameters con los SqlParameter
            var dapperParams = new DynamicParameters();

            foreach (var param in parameters)
            {
                dapperParams.Add(param.ParameterName, param.Value);
            }

            if (sqlConnection.State != ConnectionState.Open)
                await sqlConnection.OpenAsync();

            var result = await sqlConnection.QueryAsync<dynamic>(
                storedProcedureName,
                dapperParams,
                commandType: CommandType.StoredProcedure
            );

            return result.ToList();
        }

        public async Task<IEnumerable<dynamic>> ExecuteStoredProcedureAsList(SqlConnection sqlConnection, string storedProcedureName, object? parameters = null)
        {

            var result = await sqlConnection.QueryAsync<dynamic>(
                storedProcedureName,
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return result;
        }
        public async Task<int> ExecuteNonQueryAsync(SqlConnection connection, string sql, params SqlParameter[] parameters)
        {
            using var command = new SqlCommand(sql, connection);
            // Si la conexi?n no est? abierta, ?brela aqu?. Tu _dbContFactory.GetSqlConnection
            // ya podr?a estar haci?ndolo, pero es buena pr?ctica verificar.
            if (connection.State != ConnectionState.Open)
            {
                await connection.OpenAsync();
            }

            if (parameters != null && parameters.Length > 0)
            {
                command.Parameters.AddRange(parameters);
            }

            return await command.ExecuteNonQueryAsync();
        }

        // NUEVO M?TODO SOBRECARGADO.
        public async Task<int> ExecuteNonQueryAsync(SqlConnection connection, string sql, SqlTransaction transaction, params SqlParameter[] parameters)
        {
            // La l?gica es casi id?ntica, pero usamos una transacci?n existente.
            using var command = new SqlCommand(sql, connection, transaction); // Asignamos la transacci?n aqu?
                                                                              // No es necesario abrir la conexi?n, porque la capa de servicio ya lo hizo.
            if (parameters != null && parameters.Length > 0)
            {
                command.Parameters.AddRange(parameters);
            }

            return await command.ExecuteNonQueryAsync();
        }

        public async Task<T> ExecuteScalarAsync<T>(SqlConnection connection, string sqlQuery, SqlParameter[] parameters)
        {
            using var command = new SqlCommand(sqlQuery, connection);

            if (parameters != null)
            {
                command.Parameters.AddRange(parameters);
            }
            // Aseg?rate de que la conexi?n est? abierta
            if (connection.State != ConnectionState.Open)
            {
                await connection.OpenAsync();
            }
            object result = await command.ExecuteScalarAsync();

            if (result == null || result == DBNull.Value)
            {
                return default(T); // Devuelve el valor por defecto para el tipo T si es nulo o DBNull
            }

            // Intenta convertir el resultado al tipo T deseado
            try
            {
                return (T)Convert.ChangeType(result, typeof(T));
            }
            catch (InvalidCastException)
            {
                throw new InvalidCastException($"No se puede convertir el resultado de tipo {result.GetType()} al tipo {typeof(T)}.");
            }
            catch (FormatException)
            {
                throw new FormatException($"La cadena de entrada no tiene el formato correcto para el tipo {typeof(T)}.");
            }
            // Puedes a?adir m?s manejo de errores espec?ficos aqu? seg?n tus necesidades
        }
    }
}
