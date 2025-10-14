// En: /Mark/Consulta/Informacion/Correos/DAOs/CorreosDAO.cs
using CoorinWeb.Loki.Global;
using Dapper;
using Loki.Mark.Consulta.Informacion.Correos.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Loki.Mark.Consulta.Informacion.Correos.DAOs
{
	public class CorreosDAO : ICorreosDAO
	{
		private readonly IDbContextFactory _dbContextFactory;

		public CorreosDAO(IDbContextFactory dbContextFactory)
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