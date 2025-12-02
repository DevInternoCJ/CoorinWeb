using CoorinWeb.Loki.Global;
using Loki.Mark.Administracion.Gespa.Frases.Interfaces;
using static CoorinWeb.Loki.Global.EntityTypeHelper;
namespace Loki.Mark.Administracion.Gespa.Frases.Services
{
    public class FrasesServices : IFrasesService
    {
        private readonly CustomDbContextFactory _dbContFactory;


        public FrasesServices(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);

        }

        public async Task<List<object>> GetFrasesMotivacion(string servidor, int idEjecutivo)
        {
            var contextCollection = _dbContFactory.GetDbContext(servidor, "Collection");

            var campos = new List<string>
            {
                "idRegistro",
                "idEjecutivo",
                "idCartera",
                "FraseActiva",
                "idProducto",
                "FechaInsert",  
                "SegundoInsert",
                "Texto"
            };

            var filtros = new List<DynamicFilter>
            {
                new DynamicFilter
                {
                    Campo = "idEjecutivo",
                    Operador = "=",
                    Valor = idEjecutivo
                }
            };

            var frases = await FetchEntityTableWithFilters(
                contextCollection,
                "FrasesMotivacion",
                filtros,
                campos
            );

            return frases;
        }

    }
}
