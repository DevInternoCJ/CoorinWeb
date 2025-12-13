using Loki.DTOs.Procesos.Accionamientos.CarteoDTOs;
using System.Data;

namespace Loki.Mark.Procesos.Accionamientos.Carteo.Interfaces
{
    public interface ICarteoDAO
    {
        Task<CarteoBusquedaDto?> BuscarCuentaAsync(string servidor, int idCartera, string cuentaOrExpediente, bool esExpediente);
        Task<IEnumerable<DomicilioCarteoDto>> ObtenerDomiciliosAsync(string servidor, int idCartera, string idCuenta);
        Task<bool> InsertarCarteoManualAsync(string servidor, GuardarCarteoManualRequestDto request, int idEjecutivo);

        // Métodos para Carga Masiva
        Task CrearTablaTemporalAsync(string servidor, int idEjecutivo);
        Task RealizarBulkCopyAsync(string servidor, DataTable datos, string nombreTablaDestino);
        Task<IEnumerable<dynamic>> ProcesarCargaAsync(string servidor, int idEjecutivo, int idCartera, string selector);
    }
}
