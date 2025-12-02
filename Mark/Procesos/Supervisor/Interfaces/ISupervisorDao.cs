using Loki.DTOs.SupervisorDTO;

namespace Loki.Mark.Procesos.Procesos.Interfaces
{
    public interface ISupervisorDao
    {
        Task<(bool Success, string Message)> InsertarCuentas(InsertarCuentasRequest request, string servidor);
    }
}
