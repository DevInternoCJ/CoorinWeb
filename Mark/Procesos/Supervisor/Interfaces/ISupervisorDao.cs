using Loki.DTOs.SupervisorDTO;

namespace Loki.Mark.Procesos.Procesos.Interfaces
{
    public interface ISupervisorDao
    {
        Task<(bool success, string message)> insertaCuentas(string servidor, int idCartera, int idConsulta, int iFilas, List<EjecutivoDto> ejecutivos);
    }
}
