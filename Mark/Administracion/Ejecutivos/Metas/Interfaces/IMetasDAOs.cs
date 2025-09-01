using Loki.DTOs.EjecutivosDTO;

namespace Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces
{
    public interface IMetasDAOs
    {

        Task<int> EstableceMetaEjecutivo(EjecutivosMetasDto model, string servidor);

    }
}
