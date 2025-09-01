namespace Loki.Mark.Consulta.Cuenta.Interfaces
{
    public interface ICatalogosServiceRe
    {
        Task<Loki.DTOs.CatalogosDTOs.InitialAppDataDto> GetInitialAppDataAsync(string servidor, int idUsuarioJerarquia, int? idCarteraPreseleccionada, int? idProductoPreseleccionado);
        Task<List<dynamic>> GetCatalogValuesAsync(string servidor, int idCatalogo);
        Task<List<dynamic>> GetBooleanTableAsync(string servidor);
    }
}
