using Loki.DTOs.MetasDTOs;
using System.Data;

namespace Loki.Mark.Procesos.Metas.Interfaces
{
    public interface IMetasDao
    {
        Task<Bloqueo> Bloqueo(string usuario, string servidor);
        Task<CargarMetasResponse> CargarMetas(CargarMetasRequest request, int idEjecutivo, string servidor);
        DataTable LeerMetasDesdeExcel(IFormFile archivo);
        List<MetaDetalleDto> ConvertDatatableToList(DataTable dt);
    }
}
