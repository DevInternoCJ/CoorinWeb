using Microsoft.Data.SqlClient;
using System.Data;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth;
using Loki.Mark.Administracion.Gespa.Frases.Interfaces;
using Loki.DTOs.FrasesDTOs;

namespace Loki.Mark.Administracion.Gespa.Frases.DAOs
{
	public class FrasesDao : IFrases
	{
		private readonly CustomDbContextFactory _dbContFactory;
		public FrasesDao(CustomDbContextFactory dbContFactory)
		{
			_dbContFactory = dbContFactory ?? throw new ArgumentNullException(nameof(dbContFactory));
		}


		public async Task<bool> GuardaFrasesAsync(FrasesDTO pFrases, string servidor)
		{
			// Validación del texto de la frase
			if (string.IsNullOrEmpty(pFrases.TextoFrase))
			{
				Console.WriteLine("Introduce una frase por favor. La frase no puede estar vacía.");
				return false;
			}

			const string tipoBase = "Memory"; 

			if (servidor?.Contains('_') == true) throw new ArgumentException($"Servidor '{servidor}' inválido.");

			using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);
			try
			{
				await sqlConnection.OpenAsync();

				string sqlCommand = "EXEC [dbo].[GuardaFrasesMotivacionales] @idEjecutivo, @idCartera, @idProducto, @Texto";
				using var cmd = new SqlCommand(sqlCommand, sqlConnection);

				cmd.Parameters.Add("@idEjecutivo", SqlDbType.NVarChar).Value = pFrases.IdEjecutivo ?? (object)DBNull.Value;
				cmd.Parameters.Add("@idCartera", SqlDbType.NVarChar).Value = pFrases.IdCartera ?? (object)DBNull.Value;
				cmd.Parameters.Add("@idProducto", SqlDbType.NVarChar).Value = pFrases.IdProducto ?? (object)DBNull.Value;
				cmd.Parameters.Add("@Texto", SqlDbType.NVarChar).Value = pFrases.TextoFrase ?? (object)DBNull.Value;

				int rowsAffected = await cmd.ExecuteNonQueryAsync();
				return rowsAffected > 0;
			}
			catch (SqlException ex)
			{
				Console.WriteLine($"SQL Error al guardar frase: {ex.Message}");
				throw;
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error inesperado al guardar frase: {ex.Message}");
				throw; 
			}
		
		}


	}
}
