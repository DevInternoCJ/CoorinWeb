using Loki.DTOs.AuditoriaDTOs;

namespace Loki.Mark.Auditoria.Interfaces
{
    public interface IAuditoriaDao
    {
        Task<IEnumerable<AuditoriaDetalleDto>> ObtenerPaginadoAsync(AuditoriaFilterDto parametros, string servidor);
        Task<int> ContarTotalAsync(AuditoriaFilterDto parametros, string servidor);
    }

}
