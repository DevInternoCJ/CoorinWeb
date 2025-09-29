using CoorinWeb.Loki.Global;
using Loki.Mark.Administracion.Campanias.Interfaces;

namespace Loki.Mark.Administracion.Carteras.Services
{
	public class CampaniasService : ICampaniasService
	{
		private readonly CustomDbContextFactory _dbContFactory;

		public CampaniasService(IServiceProvider serviceProvider)
		{
			_dbContFactory = new CustomDbContextFactory(serviceProvider);

		}

		public async Task<List<object>> GetCarteras(string servidor)
		{
			var context = _dbContFactory.GetDbContext(servidor, "Collection");

			var resultados = await EntityTypeHelper.GetFullEntityTable(context, "VwCarterasActiva");

			return resultados;
		}

		public async Task<List<object>> GetCarterasProductos(string servidor)
		{
			var context = _dbContFactory.GetDbContext(servidor, "Collection");

			var resultados = await EntityTypeHelper.GetFullEntityTable(context, "vw_CarterasProductos");

			return resultados;
		}




	}
}
