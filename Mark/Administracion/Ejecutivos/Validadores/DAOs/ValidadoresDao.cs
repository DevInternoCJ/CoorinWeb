using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.EjecutivosDTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Text.Json;
using Loki.Mark.Administracion.Ejecutivos.Validadores.Interfaces;
using Microsoft.EntityFrameworkCore.Internal;

namespace Loki.Mark.Administracion.Ejecutivos.Validadores.DAOs

{
    public class ValidadoresDao: IValidadoresDAOs

    {
        private readonly IDbContextFactory _dbContFactory;

        public ValidadoresDao(IDbContextFactory dbContFactory)
        {

            _dbContFactory = dbContFactory;
        }


        public async Task<string> InsertaEliminaValidadores(ValidadoresRequest dto, string servidor, string tipoBase)
        {
            var connection = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            try
            {
                await connection.OpenAsync();
                string query = dto.inserta
                    ? "INSERT INTO dbo.Validadores (idProducto, idEjecutivo) VALUES (@idProducto, @idEjecutivo)"
                    : "DELETE FROM dbo.Validadores WHERE idProducto = @idProducto AND idEjecutivo = @idEjecutivo";
                using var command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@idProducto", dto.idProducto);
                command.Parameters.AddWithValue("@idEjecutivo", dto.IdEjecutivo);
                int affectedRows = await command.ExecuteNonQueryAsync();
                if (affectedRows == 0)
                {
                    return dto.inserta
                        ? "No se pudo insertar el validador."
                        : "No se encontró un validador para eliminar.";
                }
                return dto.inserta
                    ? "Validador dado de alta."
                    : "Se dio de baja al validador.";
            }
            catch (Exception ex)
            {
                return $"Error al procesar validador: {ex.Message}";
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    await connection.CloseAsync();
            }
        }


        public async Task<string> InsertaEliminaValidadoresArrepentimientos(ValidadoresRequest dto, string servidor, string tipoBase)
        {
            var connection = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            try
            {
                await connection.OpenAsync();
                string query = dto.inserta
                     ? "INSERT INTO dbo.ValidadoresArrepentimientos (idProducto, idEjecutivo) VALUES (@idProducto, @idEjecutivo)"
                    : "DELETE FROM dbo.ValidadoresArrepentimientos WHERE idProducto = @idProducto AND idEjecutivo = @idEjecutivo";
                using var command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@idProducto", dto.idProducto);
                command.Parameters.AddWithValue("@idEjecutivo", dto.IdEjecutivo);
                int affectedRows = await command.ExecuteNonQueryAsync();
                if (affectedRows == 0)
                {
                    return dto.inserta
                        ? "No se pudo insertar el validador."
                        : "No se encontró un validador para eliminar.";
                }
                return dto.inserta
                    ? "Validador dado de alta."
                    : "Se dio de baja al validador.";
            }
            catch (Exception ex)
            {
                return $"Error al procesar validador: {ex.Message}";
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    await connection.CloseAsync();
            }
        }


    }

}

 


