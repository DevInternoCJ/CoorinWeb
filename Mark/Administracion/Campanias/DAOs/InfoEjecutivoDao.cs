using Microsoft.Data.SqlClient;
using CoorinWeb.Loki.Global;

using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Loki.DTOs.InfoEjecutivoDTO;




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


        public async Task<ResultadoConsultasEjecutivoDTO?> GetConsultasEjecutivo(string servidor, int idEjecutivo)
        {
            const string tipoBase = "Collection";

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            var nombreSp = "[dbo].[1.5.ConsultasEjecutivo]";

            using var reader = await _daoBase.ExecuteQueryMultiple(
                sqlConnection,
                nombreSp,
                new SqlParameter("@idEjecutivo", idEjecutivo)
            );
            var consultas = (await reader.ReadAsync<ConsultaDTO>()).ToList();

            if (consultas == null || consultas.Count == 0)
            {
                return null;
            }          
            var parametros = (await reader.ReadAsync<ParametroDTO>()).ToList();
            var agrupar = (await reader.ReadAsync<AgruparDTO>()).ToList();

            return new ResultadoConsultasEjecutivoDTO
            {
                Consultas = consultas,      
                Parametros = parametros,
                Agrupar = agrupar
            };
        }
    }
}
