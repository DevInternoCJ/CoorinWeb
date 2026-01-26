using Loki.DTOs.Procesos.Visitas;

namespace Loki.Mark.Procesos.Visitas.Corregir.DAOs
{
    public interface ICorregirVisitasDAO
    {
        Task<IEnumerable<VisitaEditableDto>> BuscarVisitasAsync(string servidor, int idCartera, string idCuenta);
        Task<int?> ObtenerIdEjecutivoPorUsuarioAsync(string servidor, string usuario);
        Task<string?> ObtenerValorActualAsync(string servidor, int idCartera, string idCuenta, DateTime fechaKey, TimeSpan horaKey, string nombreColumnaBD);
        Task<bool> ActualizarVisitaAsync(string servidor, int idCartera, string idCuenta, DateTime fechaKey, TimeSpan horaKey, string nombreColumnaBD, object nuevoValor, string valorAnterior, int idEjecutivoSesion);
    }
}