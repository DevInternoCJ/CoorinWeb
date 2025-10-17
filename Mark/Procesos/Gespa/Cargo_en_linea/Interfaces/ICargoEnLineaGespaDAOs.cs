using Loki.DTOs.GespaDTOs;

namespace Loki.Mark.Procesos.Gespa.Cargo_en_linea.Interfaces
{
    public interface ICargoEnLineaGespaDAOs
    {
        Task<dynamic?> ValidateCargoEnLineaAutorizarBuscar(CargoEnLineaGespaAutorizarBuscar request);        
        Task<dynamic?> ValidateCargoEnLineaAutorizar(CargoEnLineaAutorizar request);
        Task<dynamic?> ValidateCargoEnLineaCorregirBuscar(CargoEnLineaCorregirBuscar request);
        Task<dynamic?> ValidateCargoEnLineaCorregir(CargoEnLineaCorregir request);
    }
}
