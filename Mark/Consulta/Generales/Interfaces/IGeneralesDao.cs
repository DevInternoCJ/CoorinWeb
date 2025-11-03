using Loki.DTOs.GeneralesDTOs;

namespace Loki.Mark.Consulta.Generales.Interfaces
{
    public interface IGeneralesDao
    {
        Task<SearchResultDto> RealizaBusqueda(int idProducto, int idCartera, string servidor, int tipoResultado, int jerarquia, int? idConsulta = null, IEnumerable<ParameterDto>? parametrosExtra = null, IEnumerable<AgruparDTO>? agruparExtra = null, DateTime? desdeFecha = null);
    }
}
