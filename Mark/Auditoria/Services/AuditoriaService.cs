using Loki.DTOs.AuditoriaDTOs;
using Loki.Mark.Auditoria.Interfaces;

namespace Loki.Mark.Auditoria.Services
{
    public class AuditoriaService: IAuditoriaService
    {
        private readonly IAuditoriaDao _auditoriaDao;

        public AuditoriaService(IAuditoriaDao dao)
        {
            _auditoriaDao = dao;
        }

        public async Task<(IEnumerable<AuditoriaDetalleDto> Datos, int Total)> ObtenerAuditoriaDetalleAsync(AuditoriaFilterDto parametros, string servidor)
        {
            var datos = await _auditoriaDao.ObtenerPaginadoAsync(parametros, servidor);
            var total = await _auditoriaDao.ContarTotalAsync(parametros, servidor);
            return (datos, total);
        }
    }
}
