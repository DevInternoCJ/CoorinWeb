using Loki.DTOs.DiaDelEjecutivoDTOs;
namespace Loki.Mark.Reportes.DiaDelEjecutivo.Interfaces
{
    public interface IDiaDelEjecutivoDAOs
    {
        Task<dynamic?> ValidateDiaDelEjecutivo(DiaDelEjecutivoDTOs request);



    }
}
