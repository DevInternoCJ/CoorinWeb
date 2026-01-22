using Loki.DTOs.Procesos.Visitas;
using System.Security.Claims;

namespace Loki.Mark.Procesos.Visitas.Corregir.Services
{
    public interface ICorregirVisitasService
    {
        Task<IEnumerable<VisitaEditableDto>> BuscarVisitasAsync(string servidor, BuscarVisitasRequestDto request);
        Task<bool> EditarVisitaAsync(string servidor, EditarVisitaRequestDto request, ClaimsPrincipal user);
    }
}