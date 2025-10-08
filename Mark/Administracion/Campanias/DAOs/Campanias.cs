using Microsoft.Data.SqlClient;
using CoorinWeb.Loki.Global;

using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.Mark.Administracion.Campanias.Interfaces;




namespace Loki.Mark.Administracion.Campanias.DAOs
{
    public class Campanias : ICampaniasDao
    {
        private readonly DaoBase _daoBase;
        private readonly CustomDbContextFactory _dbContFactory;
        public Campanias(IServiceProvider serviceProvider, DaoBase daoBase)
        {
            _daoBase = daoBase;
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
        }


        public async Task<List<dynamic>?> GetCampañasEncargado(string servidor, int? idEncargado, short? idCartera = null, short? idProducto = null)
        {
            const string tipoBase = "Collection";

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            var nombreSp = "[dbMemory].[AMS].[CampañasDelEncargado]";

            return await _daoBase.ExecuteStoredProcedure(
                sqlConnection,
                nombreSp,
                new SqlParameter("@idEncargado", idEncargado),
                new SqlParameter("@idCartera", idCartera.HasValue ? idCartera.Value : DBNull.Value),
                new SqlParameter("@idProducto", idProducto.HasValue ? idProducto.Value : DBNull.Value)
            );
        }

        public async Task<List<dynamic>?> PatchEnciendeApagaCampañas(string servidor, short idCampaña, bool Encender)
        {
            const string tipoBase = "Memory";
            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            var nombreSp = "[dbMemory].[AMS].[EnciendeApagaCampaña]";
            return await _daoBase.ExecuteStoredProcedure(
                sqlConnection,
                nombreSp,
                new SqlParameter("@idCampaña", idCampaña),
                new SqlParameter("@Encender", Encender)
            );
        }

    }
}