using Loki.DTOs.Procesos.Visitas;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Loki.Mark.Procesos.Visitas.Eliminar.Interfaces
{
    public interface IEliminarVisitasService
    {
        Task<EliminarVisitasResponseDto> ProcesarEliminacionAsync(string servidor, EliminarVisitasRequestDto request, ClaimsPrincipal user);
    }
}