using Loki.DTOs.GespaDTOs;

namespace Loki.Mark.Procesos.Gespa.Definicion.Interfaces
{

    public interface IDefinicionGespaBuscaDAOs
    {
        Task<dynamic?> ValidateDefinicionBusqueda(DefinicionBusqueda request);

        Task<dynamic?> ValidateDefinicion(Define request);

    }
    
}
