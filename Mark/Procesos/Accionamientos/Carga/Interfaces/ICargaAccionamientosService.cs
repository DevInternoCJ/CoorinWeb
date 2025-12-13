// Ubicación: /Mark/Procesos/Accionamientos/Services/ICargaAccionamientosService.cs
using Loki.DTOs.Procesos.Accionamientos.CargaDTOs;
using System.Security.Claims;

namespace Loki.Mark.Procesos.Accionamientos.Carga.Interfaces
{
    public interface ICargaAccionamientosService
    {
        Task<CargaAccionamientosResponseDto> ProcesarCargaAsync(string servidor, CargaAccionamientosRequestDto request, ClaimsPrincipal user);
    }
}