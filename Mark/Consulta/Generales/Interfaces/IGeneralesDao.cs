using Loki.DTOs.GeneralesDTOs;

namespace Loki.Mark.Consulta.Generales.Interfaces
{
    public interface IGeneralesDao
    {
        Task<SearchResultDto> RealizaBusqueda(
             int idProducto,
             int idCartera,
             string servidor,
             int tipoResultado, // 1=Contar, 2=Detalle, 3=Cuentas
             int? idConsulta = null,
             IEnumerable<ParameterDto>? parametrosExtra = null,
             IEnumerable<AgruparDTO>? agruparExtra = null,
             DateTime? desdeFecha = null
         );
    }
}
