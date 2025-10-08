using Loki.DTOs.EjecutivosDTO;
using Loki.DTOs.ProductividadDTO;

namespace Loki.Mark.Consulta.Productividad.Interfaces
{
    public interface IProductividadService
    {
        Task<object> obtieneProductividad(string indicador, int idEjecutivo, string servidor, bool esModoHora = false);
    }

}
