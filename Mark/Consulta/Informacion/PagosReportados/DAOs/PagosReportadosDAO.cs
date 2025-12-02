using CoorinWeb.Loki.Global;
using Dapper;
using Loki.Mark.Consulta.Informacion.PagosReportados.Interfaces;

namespace Loki.Mark.Consulta.Informacion.PagosReportados.DAOs
{
	public class PagosReportadosDAO : IPagosReportadosDAO
	{
		private readonly IDbContextFactory _dbContextFactory;

		public PagosReportadosDAO(IDbContextFactory dbContextFactory)
		{
			_dbContextFactory = dbContextFactory;
		}

		public async Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros)
		 {
			string tipoBase = "Collection";
			const int timeoutSeconds = 1800;

			using var connection = _dbContextFactory.GetSqlConnection(servidor, tipoBase);

			await connection.OpenAsync();
			return await connection.QueryAsync<T>(sql, parametros, commandTimeout: timeoutSeconds);
		}
	}
}
