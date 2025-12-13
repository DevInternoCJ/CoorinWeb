// Ubicación: /Mark/Procesos/Accionamientos/DAOs/ICargaAccionamientosDAO.cs
using System.Data;

namespace Loki.Mark.Procesos.Accionamientos.Carga.Interfaces
{
    public interface ICargaAccionamientosDAO
    {
        Task CrearTablaTemporalAsync(string servidor, int idEjecutivo, string tema, int idAcercamiento, int idCartera, bool esPorTipo);
        Task RealizarBulkCopyAsync(string servidor, DataTable datos, string nombreTablaDestino);
        Task<IEnumerable<dynamic>> ProcesarCargaAsync(string servidor, int idCartera, int idEjecutivo, int idAcercamiento, string nombrePaquete, string descripcion, string baseDatos, bool esPorTipo);
        Task RegistrarLogProcesoAsync(string servidor, int idCartera, int idEjecutivo, string nombreArchivo, int totalRegistros, int insertados);
    }
}