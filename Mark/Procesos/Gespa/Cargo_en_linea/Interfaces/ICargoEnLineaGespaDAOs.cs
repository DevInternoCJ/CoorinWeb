using Loki.DTOs.GespaDTOs;

namespace Loki.Mark.Procesos.Gespa.Cargo_en_linea.Interfaces
{
    public interface ICargoEnLineaGespaDAOs
    {
        Task<dynamic?> ValidateCargoEnLineaAutorizarBuscar(CargoEnLineaGespaAutorizarBuscar request, string servidor);        
        Task<dynamic?> ValidateCargoEnLineaAutorizar(CargoEnLineaAutorizar request, string servidor);
        Task<dynamic?> ValidateCargoEnLineaCorregirBuscar(CargoEnLineaCorregirBuscar request, string servidor);
        Task<dynamic?> ValidateCargoEnLineaCorregir(CargoEnLineaCorregir request, string servidor);
    }
}
