using Loki.DTOs.EjecutivosDTO;
using Loki.DTOs.ProductividadDTO;

namespace Loki.Mark.Consulta.Productividad.Interfaces
{
    public interface IProductividadService
    {
        Task<List<DTOs.ProductividadDTO.ProductividadDTO>> obtieneProductividad(string indicador, int idejecutivo, string servidor);
    }
}
