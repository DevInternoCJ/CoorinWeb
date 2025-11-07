using Loki.DTOs.SupervisorDTO;

namespace Loki.Mark.Procesos.Procesos.Interfaces
{
    public interface ISupervisorService
    {
        Task<List<object>> obtieneSupervisores(string servidor, int idCartera);
        Task<List<object>> obtieneCuentas(string servidor, int idCartera, DateTime fechaDesde, DateTime fechaHasta);
        
    }
}
