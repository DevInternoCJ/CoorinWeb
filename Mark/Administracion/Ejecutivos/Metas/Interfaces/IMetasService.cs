using Loki.DTOs.EjecutivosDTO;

namespace Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces
{
    public interface IMetasService
    {
        Task<IEnumerable<ProductividadDTO>> ObtenerMetasEjecutivos(string servidor, List<int> ejecutivoIdsPropios);
    }
}
