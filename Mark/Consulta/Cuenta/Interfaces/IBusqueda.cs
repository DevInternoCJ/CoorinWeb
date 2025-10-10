using System.Data;
using Loki.DTOs.BusquedaDTOs;

namespace Loki.Mark.Consulta.Cuenta.Interfaces
{
    public interface IBusqueda
    {
        Task<SearchResultDto> RealizarBusquedaAsync(SearchCriteriaDto criteria);
        Task<string> GuardarConsulta(string nombreConsulta,int idProducto,int idCartera,DataTable parametros,
        DataTable agrupar, DateTime desde,int idEjecutivo, string servidor,string tipoBase);
    }
}
