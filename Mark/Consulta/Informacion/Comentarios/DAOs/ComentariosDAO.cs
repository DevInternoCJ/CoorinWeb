using CoorinWeb.Loki.Global;
using Dapper;

namespace Loki.Mark.Consulta.Informacion.Comentarios.DAOs
{
	public class ComentariosDAO : IComentariosDAO
	{
		private readonly IDbContextFactory _dbContextFactory;

		public ComentariosDAO(IDbContextFactory dbContextFactory)
		{
			_dbContextFactory = dbContextFactory;
		}

		public async Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros)
		{
			using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
			{
				return await connection.QueryAsync<T>(sql, parametros);
			}
		}
	}
}