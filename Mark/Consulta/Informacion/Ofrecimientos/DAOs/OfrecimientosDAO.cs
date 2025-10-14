using CoorinWeb.Loki.Global;
using Dapper;

namespace Loki.Mark.Consulta.Informacion.Ofrecimientos.DAOs
{
	public class OfrecimientosDAO : IOfrecimientosDAO
	{
		private readonly IDbContextFactory _dbContextFactory;

		public OfrecimientosDAO(IDbContextFactory dbContextFactory)
		{
			_dbContextFactory = dbContextFactory;
		}

		public async Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros)
		{
			using var connection = _dbContextFactory.GetSqlConnection(servidor, "collection");
			return await connection.QueryAsync<T>(sql, parametros);
		}
	}
}