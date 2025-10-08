using Loki.DTOs.EjecutivosDTO;

namespace Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces
{
    public interface IMetasService
    {
        Task<IEnumerable<MetasRequest>> ObtenerMetasEjecutivos(string servidor, List<int> ejecutivoIdsPropios);
       
    }
}
