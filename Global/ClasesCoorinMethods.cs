using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.SesionesDTOs;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using static CoorinWeb.Loki.Global.EntityTypeHelper;

namespace Loki.Global
{
	public static class ClasesCoorinMethods
	{
		public static async Task<List<EjecutivoPropio>> ObtieneEjecutivosPropios(SqlConnection connection, int idEncargado)
		{
			var sql = "SELECT * FROM dbCollection..fn_EjecutivosPropios(@idEncargado)";
			var parametros = new { idEncargado };
			var result = await connection.QueryAsync<EjecutivoPropio>(sql, parametros);
			return result.ToList();
		}

		public static async Task<List<int>> GetIdEjecutivosPropiosAsync(
			SqlConnection connection,
			int idEjecutivo,
			bool soloDescendientes = false)
		{
			var descendientes = await ObtieneEjecutivosPropios(connection, idEjecutivo);


			// Extrae todos los IDs de los ejecutivos descendientes
			var idDescendientes = descendientes
				.Select(e => e.IdEjecutivo) // Asegúrate de que la clase EjecutivoPropio tenga esta propiedad
				.Distinct()
				.ToList();

			// Agrega el ejecutivo actual si no es solo descendientes
			if (!soloDescendientes && !idDescendientes.Contains(idEjecutivo))
				idDescendientes.Insert(0, idEjecutivo);

			return idDescendientes;
		}


	}

}
