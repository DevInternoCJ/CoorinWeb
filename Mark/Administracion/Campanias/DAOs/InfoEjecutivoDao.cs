using Microsoft.Data.SqlClient;
using CoorinWeb.Loki.Global;

using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Loki.Mark.Administracion.Carteras.Interfaces;




namespace Loki.Mark.Administracion.Campanias.DAOs
{
	public class InfoEjecutivoDao : IInfoEjecutivoDao
	{
		private readonly DaoBase _daoBase;
		private readonly CustomDbContextFactory _dbContFactory;
		public InfoEjecutivoDao(IServiceProvider serviceProvider,DaoBase daoBase)
		{
			_daoBase = daoBase;
			_dbContFactory = new CustomDbContextFactory(serviceProvider);
		}


		public async Task<List<dynamic>?> GetConsultasEjecutivo(string servidor, int idEjecutivo)
		{
			const string tipoBase = "Collection";

			var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);
			var nombreSp = "[1.5.ConsultasEjecutivo]";

			return await _daoBase.ExecuteStoredProcedure(
				sqlConnection,
				nombreSp,
				new SqlParameter("@idEjecutivo", idEjecutivo)
			);
		}
	}
}
