using System.Collections;
using System.Data;
using CoorinWeb.Loki.Global;
using Loki.Mark.Consulta.Cuenta.Services;
using Microsoft.Data.SqlClient;
using static Loki.Mark.Consulta.Cuenta.Services.CatalogosService;

namespace Loki.Mark.Consulta.Cuenta.Interfaces
{
    public interface ICatalogosServiceRe
    {
        List<CatalogosService.CarteraDto> Carteras { get; }
        List<CatalogosService.ProductoDto> Productos { get; }
        List<CatalogosService.MotivoDto> Rechazos { get; }
        List<CatalogosService.CatalogosDTO> CatalogosConsultas { get; }
        List<CatalogosService.VersionamientoDto> Versiones { get; }

        Task CargarCatalogosAsync(string servidor);
        Task<List<string>> ColumnasProductoAsync(string servidor, int idProducto);
        Task<List<CatalogosService.UsuarioRHDto>> CargarUsuariosRHAsync(string servidor, string tipoBase, string usuarioRH);
        Task<bool> CargarVersionamientoAsync(string servidor, string tipoBase);
    
}
}
