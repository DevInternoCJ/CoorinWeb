using Loki.DTOs.AuditoriaDTOs;

namespace Loki.Mark.Auditoria.Interfaces
{
    public interface IAuditoriaService
    {
        Task<(IEnumerable<AuditoriaDetalleDto> Datos, int Total)> ObtenerAuditoriaDetalleAsync(AuditoriaFilterDto parametros, string servidor);
    }

}
