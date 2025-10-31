using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.Mark.Consulta.Informacion.Pagos.Interfaces;

namespace Loki.Mark.Consulta.Informacion.Pagos.DAOs
{
	public class PagosDAO : IPagosDAO
	{
		private readonly CustomDbContextFactory _dbContFactory;


		public PagosDAO(CustomDbContextFactory dbContFactory)
		{
			_dbContFactory = dbContFactory;
		}

		public async Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros)
		{
			// El tipo de base parece ser fijo para esta consulta.
			string tipoBase = "Collection";
			const int timeoutSeconds = 1800;

			using var connection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

			await connection.OpenAsync();
			return await connection.QueryAsync<T>(sql, parametros, commandTimeout: timeoutSeconds);
		}
	}
}
