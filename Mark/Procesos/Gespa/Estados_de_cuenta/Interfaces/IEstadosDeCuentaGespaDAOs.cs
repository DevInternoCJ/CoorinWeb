using Loki.DTOs.GespaDTOs;
namespace Loki.Mark.Procesos.Gespa.Estados_de_cuenta.Interfaces
{
    public interface IEstadosDeCuentaGespaDAOs
    {
        Task<dynamic?> ValidateEstadosDeCuenta(EstadosDeCuenta request);
        Task<dynamic?> ValidateEstadosDeCuentaModifica(EstadosDeCuentaGespaModificar request);




    }
}
