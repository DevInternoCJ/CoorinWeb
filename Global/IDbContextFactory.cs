using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CoorinWeb.Loki.Global
{
	public interface IDbContextFactory
	{
		DbContext GetDbContext(string servidor, string tipoBase);
		SqlConnection GetSqlConnection(string servidor, string tipoBase);
	}

}