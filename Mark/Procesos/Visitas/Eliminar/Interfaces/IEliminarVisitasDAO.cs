using System.Data;

namespace Loki.Mark.Procesos.Visitas.Eliminar.DAOs
{
    public interface IEliminarVisitasDAO
    {
        Task CrearTablaTemporalAsync(string servidor, int idEjecutivo, DataTable estructura);
        Task RealizarBulkCopyAsync(string servidor, int idEjecutivo, DataTable datos);
        Task EjecutarEliminacionAsync(string servidor, int idCartera, int idEjecutivo);
    }
}