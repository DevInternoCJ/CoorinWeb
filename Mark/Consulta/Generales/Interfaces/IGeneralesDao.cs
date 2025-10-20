using Loki.DTOs.GeneralesDTOs;


namespace Loki.Mark.Consulta.Generales.Interfaces
{
    public interface IGeneralesDao
    {
        Task<SearchResultDto> RealizaBusqueda(
            string servidor,
            int idCartera,
            int idProducto,
            bool esContar,
            bool esCuentas,
            bool esDetalle,
            int? idConsulta = null,
            IEnumerable<ParameterDto>? parametrosExtra = null,
            IEnumerable<AgruparDTO>? agrupamientoExtra = null);
        
    }
}
