using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.Mark.Consulta.ListaNegra.Interfaces;

namespace Loki.Mark.Consulta.ListaNegra.DAOs
{
    public class ListaNegraDao: IListaNegraDao
    {
      
            private readonly IDbContextFactory _dbContFactory;
            private readonly DaoBase _daoBase;

            public ListaNegraDao(IDbContextFactory dbContFactory, DaoBase daoBase)
            {

                _dbContFactory = dbContFactory;
                _daoBase = daoBase;
            }
        }
}
