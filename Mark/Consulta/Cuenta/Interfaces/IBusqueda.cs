using Loki.DTOs.BusquedaDTOs;

namespace Loki.Mark.Consulta.Cuenta.Interfaces
{
    public interface IBusqueda
    {
        Task<SearchResultDto> RealizarBusquedaAsync(SearchCriteriaDto criteria);
    }
}
