using CoorinWeb.Loki.Global;
using Loki.Mark.Procesos.Metas.Interfaces;

namespace Loki.Mark.Procesos.Metas.Services
{
    public class MetasService: IMetasService
    {
        private readonly CustomDbContextFactory _dbContFactory;
        public MetasService(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);

        }


    }
}
