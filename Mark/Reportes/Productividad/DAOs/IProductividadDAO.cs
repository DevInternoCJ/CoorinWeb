using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.Reportes.ProductividadDTOs;
using System.Data;

namespace Loki.Mark.Reportes.Productividad.DAOs
{
	public class ProductividadInfoDAO : IProductividadInfoDAO
	{
		private readonly IDbContextFactory _dbContextFactory;

		public ProductividadInfoDAO(IDbContextFactory dbContextFactory)
		{
			_dbContextFactory = dbContextFactory;
		}

		public async Task<IEnumerable<ProductividadDto>> ObtenerProductividadAsync(string servidor, object parametros)
		{
			string spName = "dbo.[3.2.ObtenerProductividad]";
			using var connection = _dbContextFactory.GetSqlConnection(servidor, "History");
			return await connection.QueryAsync<ProductividadDto>(
				spName,
				parametros,
				commandType: CommandType.StoredProcedure
			);
		}
	}
}