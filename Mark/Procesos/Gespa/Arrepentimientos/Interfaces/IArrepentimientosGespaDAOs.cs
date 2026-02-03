using Loki.DTOs.GespaDTOs;

namespace Loki.Mark.Procesos.Gespa.Arrepentimientos.Interfaces
{
    public interface IArrepentimientosGespaDAOs
    {
        Task<dynamic?> ValidateArrepentimientoBusqueda(DefinicionBusqueda request, string servidor);
        Task<dynamic?> ValidateArrepentimiento(Arrepentimiento request, string servidor);
    }
}
