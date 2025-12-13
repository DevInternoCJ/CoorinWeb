using Loki.DTOs.Captura.VisitasDTOs;
using Loki.DTOs.Procesos.Accionamientos.CarteoDTOs;
using System.Security.Claims;

namespace Loki.Mark.Procesos.Accionamientos.Carteo.Interfaces
{
    public interface ICarteoService
    {
        Task<CuentaCarteoResponseDto?> BuscarCuentaAsync(string servidor, int idCartera, string cuentaOrExpediente, bool esExpediente);

        Task<bool> GuardarCarteoManualAsync(string servidor, GuardarCarteoManualRequestDto request, ClaimsPrincipal user);
        Task<CargaCarteoResponseDto> ProcesarCargaMasivaAsync(string servidor, CargaCarteoRequestDto request, ClaimsPrincipal user);
    }
}
