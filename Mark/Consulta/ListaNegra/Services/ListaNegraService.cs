using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.Mark.Consulta.ListaNegra.Interfaces;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Consulta.ListaNegra.Services
{
    public class ListaNegraService : IListaNegraService
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public ListaNegraService(IServiceProvider serviceProvider, DaoBase daoBase)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = daoBase;
        }

        public async Task<bool> listanegra(int idCartera, string selector, string dato, string servidor)
        {
            var dbcontext = _dbContFactory.GetDbContext(servidor, "collection");
            var result = await _daoBase.ExecuteStoredProcedure(
                dbcontext,
                "[dbo].[4.1.BuscaListaNegra]",
                new SqlParameter("@idCartera", idCartera),
                new SqlParameter("@Selector", selector),
                new SqlParameter("@Dato", dato)
            );
            if (result != null && result.Count > 0)
            {
                return true; 
            }
            else
            {
                return false;
            }
        }
    }
}
