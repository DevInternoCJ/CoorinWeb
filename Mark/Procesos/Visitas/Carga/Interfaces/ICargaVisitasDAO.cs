using System.Data;

namespace Loki.Mark.Procesos.Visitas.Carga.DAOs
{
    public interface ICargaVisitasDAO
    {
        Task CrearTablaTemporalDinamicaAsync(string servidor, int idEjecutivo, DataTable estructura);
        Task RealizarBulkCopyAsync(string servidor, int idEjecutivo, DataTable datos);
        Task ValidarDatosAsync(string servidor, int idCartera, int idEjecutivo, bool usarComplemento);
        Task InsertarDatosAsync(string servidor, int idCartera, int idEjecutivo, bool usarComplemento);
        Task<IEnumerable<dynamic>> ObtenerErroresAsync(string servidor, int idCartera, int idEjecutivo);
    }
}