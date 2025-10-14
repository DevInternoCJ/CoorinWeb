using CoorinWeb.Loki.Global;
using Dapper;
using Loki.Mark.Consulta.Informacion.Busquedas.Interfaces;

namespace Loki.Mark.Consulta.Informacion.Busquedas.DAOs
{
	public class BusquedasDAO : IBusquedasDAO
	{
		private readonly IDbContextFactory _dbContextFactory;

		public BusquedasDAO(IDbContextFactory dbContextFactory)
		{
			_dbContextFactory = dbContextFactory;
		}

		public async Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros)
		{
			using (var connection = _dbContextFactory.GetSqlConnection(servidor, "collection"))
			{
				return await connection.QueryAsync<T>(sql, parametros);
			}
		}
	}
}