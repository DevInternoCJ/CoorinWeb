using Loki.DTOs.Procesos.Visitas;
using System.Security.Claims;

namespace Loki.Mark.Procesos.Visitas.Carga.Services
{
    public interface ICargaVisitasService
    {
        Task<CargaVisitasResponseDto> ProcesarCargaAsync(string servidor, CargaVisitasRequestDto request, ClaimsPrincipal user);
    }
}