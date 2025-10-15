using System.Data;
using Loki.DTOs.BusquedaDTOs;

namespace Loki.Mark.Consulta.Cuenta.Interfaces
{
    public interface IBusqueda
    {
        Task<SearchResultDto> RealizaBusqueda(
        int idProducto,
        int idCartera,
        string servidor,
        bool esDetalleResultado,
        int? idConsulta = null,
        IEnumerable<ParametroDto>? parametrosExtra = null);
        Task<string> GuardarConsulta(int idConsulta, string nombreConsulta,int idProducto,int idCartera,DataTable parametros,
        DataTable agrupar, DateTime desde,int idEjecutivo, string servidor,string tipoBase);
    }
}
