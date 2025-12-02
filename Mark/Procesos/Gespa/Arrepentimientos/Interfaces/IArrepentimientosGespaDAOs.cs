using Loki.DTOs.GespaDTOs;

namespace Loki.Mark.Procesos.Gespa.Arrepentimientos.Interfaces
{
    public interface IArrepentimientosGespaDAOs
    {
        Task<dynamic?> ValidateArrepentimientoBusqueda(DefinicionBusqueda request);
        Task<dynamic?> ValidateArrepentimiento(Arrepentimiento request);
    }
}
