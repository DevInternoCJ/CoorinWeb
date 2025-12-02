using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.Reportes.EjecutivosDTOs;
using System.Data;

namespace Loki.Mark.Reportes.Ejecutivos.DAOs
{
	public class ReporteEjecutivosDAO : IReporteEjecutivosDAO
	{
		private readonly IDbContextFactory _dbContextFactory;
		public ReporteEjecutivosDAO(IDbContextFactory dbContextFactory) => _dbContextFactory = dbContextFactory;

		public async Task<IEnumerable<ReporteEjecutivoDto>> ObtenerReporteAsync(string servidor, object parametros)
		{
			string spName = "dbHistory..[3.3.ReporteEjecutivos]";
			using var connection = _dbContextFactory.GetSqlConnection(servidor, "History");
			return await connection.QueryAsync<ReporteEjecutivoDto>(
				spName,
				parametros,
				commandType: CommandType.StoredProcedure
			);
		}
	}
}