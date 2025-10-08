using CoorinWeb.Loki.Global;
using Loki.DTOs.CatalogosDTOs;
using System.Data;
using System.Linq;
using Loki.Mark.Consulta.Cuenta.Interfaces;

namespace Loki.Mark.Consulta.Cuenta.Services
{
    public class CatalogosService : ICatalogosServiceRe // Implementa tu interfaz ICatalogosServiceRe
    {
        private readonly IDbContextFactory _dbContFactory;
        // Asumiendo que Ejecutivo tiene un método para obtener Consultas
        // y que Catálogo.ValoresDelCatálogo y Catálogo.TablaBit son manejados por DAOs o directamente aquí
        // Necesitarás inyectar DAOs si están separados. Por simplicidad, asumiré métodos en el servicio.

        public CatalogosService(IDbContextFactory dbContFactory)
        {
            _dbContFactory = dbContFactory;
        }

        // Método para obtener los datos iniciales de la aplicación, similar a PreparaVentana
        public async Task<InitialAppDataDto> GetInitialAppDataAsync(
            string servidor,
            int idUsuarioJerarquia, // Simula Ejecutivo.Datos["Jerarquía"]
            int? idCarteraPreseleccionada, // Simula Ejecutivo.Datos["idCartera"]
            int? idProductoPreseleccionado) // Simula Ejecutivo.Datos["idProducto"]
        {
            // 1. Signos (datos estáticos)
            var signos = new List<SignoDto>
            {
                new SignoDto { Signo = "<", Texto = "< menor" },
                new SignoDto { Signo = "≤", Texto = "≤ menor o Igual" },
                new SignoDto { Signo = "=", Texto = "= Igual" },
                new SignoDto { Signo = "≥", Texto = "≥ MAYOR o Igual" },
                new SignoDto { Signo = ">", Texto = "> MAYOR" },
                new SignoDto { Signo = "≠", Texto = "≠ Diferente" }
            };

            // 2. Carteras (desde tu DB)
            // Ya tienes CampaniasService.GetCarteras. Aquí asumiré que CatalogosService también puede acceder a ellas.
            var carterasContext = _dbContFactory.GetDbContext(servidor, "Collection");
            var carterasDynamic = await EntityTypeHelper.GetFullEntityTable(carterasContext, "VwCarterasActiva");
            var carteras = carterasDynamic.Select(d => new CarteraDto
            {
                IdCartera = EntityTypeHelper.GetProperty<int>(d, "idCartera"),
                Cartera = EntityTypeHelper.GetProperty<string>(d, "Cartera")
            }).ToList();


            // 3. Productos (desde tu DB)
            var productosContext = _dbContFactory.GetDbContext(servidor, "Collection");
            var productosDynamic = await EntityTypeHelper.GetFullEntityTable(productosContext, "VwCarterasProductos");
            var productos = productosDynamic.Select(d => new ProductoDto
            {
                IdProducto = EntityTypeHelper.GetProperty<int>(d, "idProducto"),
                Producto = EntityTypeHelper.GetProperty<string>(d, "Producto")
            }).ToList();

            // Filtrar productos si hay una cartera preseleccionada, similar a Catálogo.Productos.DefaultView.RowFilter
            if (idCarteraPreseleccionada.HasValue)
            {
                // Este filtro es sobre la lista de Productos.
                // Asegúrate de que la propiedad 'IdCartera' exista en tu 'ProductoDto'
                // o en el objeto dinámico devuelto por GetFullEntityTable.
                // Si 'VwCarterasProductos' ya filtra por cartera, esta línea podría ser redundante.
                // Para este ejemplo, asumo que ProductoDto tiene la propiedad IdCartera para filtrar.
                // Si no, necesitarías modificar ProductoDto o el mapeo.
                //productos = productos.Where(p => p.IdCartera == idCarteraPreseleccionada.Value).ToList();
                // O si es un filtro más complejo que necesita acceder a la fuente de datos original:
                // Considera pasar el idCarteraPreseleccionada a GetFullEntityTable como un filtro.
            }

            // 4. Consultas (desde tu DB - Asumo que tienes un DAO para esto)
            // Aquí simulo cómo obtendrías las consultas. Podrías tener un EjecutivoDao o similar.
            // Para este ejemplo, simularé la obtención y mapeo.
            var consultasContext = _dbContFactory.GetDbContext(servidor, "Collection"); // Asumo que las consultas están en Collection
            var consultasDynamic = await EntityTypeHelper.GetFullEntityTable(consultasContext, "VwConsultas"); // Asume una vista o tabla para consultas
            var consultas = consultasDynamic.Select(d => new ConsultaDto
            {
                IdConsulta = EntityTypeHelper.GetProperty<int>(d, "idConsulta"),
                NombreConsulta = EntityTypeHelper.GetProperty<string>(d, "NombreConsulta")
            }).ToList();

            // Lógica similar a cmbConsultas.KeyPress += ... no aplica en API, es del cliente.

            // 5. Visibilidad del "rdoDetalle"
            bool rdoDetalleVisible = idUsuarioJerarquia > 1; // Convert.ToInt32(Ejecutivo.Datos["Jerarquía"]) > 1

            // 6. Conceptos para ComboBox (similar a cmbConceptos)
            var conceptos = new List<string> { "Cuenta", "Producto", "Conteos", "Fechas" }; // Ejemplos

            // Construir el DTO final
            var initialData = new InitialAppDataDto
            {
                Signos = signos,
                Carteras = carteras,
                Productos = productos,
                Consultas = consultas,
                RdoDetalleVisible = rdoDetalleVisible,
                SelectedIdCartera = idCarteraPreseleccionada,
                SelectedIdProducto = idProductoPreseleccionado,
                Conceptos = conceptos
            };

            return initialData;
        }

        // Puedes agregar otros métodos para obtener valores de catálogos específicos
        // que antes eran Catálogo.ValoresDelCatálogo o Catálogo.TablaBit.
        public async Task<List<dynamic>> GetCatalogValuesAsync(string servidor, int idCatalogo)
        {
            var context = _dbContFactory.GetDbContext(servidor, "Collection"); // O el tipo de base de datos donde estén tus catálogos
            // Aquí deberías tener un DAO o un modelo para tus tablas de catálogo
            // Por ejemplo, si tienes una tabla 'CatalogosValores'
            var filters = new List<EntityTypeHelper.DynamicFilter>
            {
                new EntityTypeHelper.DynamicFilter { Campo = "IdCatalogo", Valor = idCatalogo }
            };
            var results = await EntityTypeHelper.FetchEntityTableWithFilters(context, "CatalogosValores", filters);
            return results;
        }

        public async Task<List<dynamic>> GetBooleanTableAsync(string servidor)
        {
            // Simular Catálogo.TablaBit(). Podría ser una tabla real o una lista estática.
            var context = _dbContFactory.GetDbContext(servidor, "Memory"); // O donde sea que esté
            var results = await EntityTypeHelper.GetFullEntityTable(context, "TablaBit"); // Asume una tabla llamada "TablaBit"
            return results;
        }
    }
}
