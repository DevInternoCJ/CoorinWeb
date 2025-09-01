using System.Data;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
namespace Loki.Mark.Administracion.Campanias.Services
{
    public class CarterasService : ICarterasService
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public CarterasService(IServiceProvider serviceProvider, DaoBase daoBase)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = daoBase;
        }

        public async Task<List<object>> GetCarteras(string servidor, string tipobase)
        {
            var context = _dbContFactory.GetDbContext(servidor, tipobase);

            var resultados = await EntityTypeHelper.GetFullEntityTable(context, "VwCarterasActiva");

            return resultados;
        }

        public async Task<List<object>> GetCarterasProductos(string servidor, string tipobase)
        {
            var context = _dbContFactory.GetDbContext(servidor, tipobase);

            var resultados = await EntityTypeHelper.GetFullEntityTable(context, "VwCarterasProductos");

            return resultados;
        }
        public async Task<dynamic?> FilasRestantesPorCampaña(int idcampaña, string servidor)
        {
            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");
            var result = await _daoBase.ExecuteStoredProcedure(
                dbContext,
                "[AMS].[FilasRestantesPorCampaña]"
            );
            return result;
        }
        public async Task<dynamic?> CargaFilas(int idcampaña, int idcartera, string servidor)
        {
            var paramIdCampaña = new SqlParameter("@idCampaña", idcampaña.ToString());
            var paramIdCartera = new SqlParameter("@idCartera", idcartera.ToString());

            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");

            var result = await _daoBase.ExecuteStoredProcedure(
                dbContext,
                "[AMS].[CargaFilas]",
                paramIdCampaña,
                paramIdCartera
            );
            return result;
        }

        public async Task<IEnumerable<dynamic>?> Top100Filas(int idcampaña, string servidor)
        {
            using var conn = _dbContFactory.GetSqlConnection(servidor, "memory");
            await conn.OpenAsync();
            const string storedprocedurename = "[ams].[top100filas]";
            return await conn.QueryAsync(
                storedprocedurename,
                param: new { idcampaña = idcampaña },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }


    }
}
