using CoorinWeb.Loki.Global;
using Dapper;
using Loki.Mark.Consulta.Informacion.Domicilios.Interfaces;

namespace Loki.Mark.Consulta.Informacion.Domicilios.DAOs
{
	public class DomiciliosDAO : IDomiciliosDAO
	{
		private readonly IDbContextFactory _dbContextFactory;

		public DomiciliosDAO(IDbContextFactory dbContextFactory)
		{
			_dbContextFactory = dbContextFactory;
		}

		public async Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros)
		{
			using var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection");
			return await connection.QueryAsync<T>(sql, parametros);
		}
	}
}
