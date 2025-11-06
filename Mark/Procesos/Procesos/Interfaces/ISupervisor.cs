namespace Loki.Mark.Procesos.Procesos.Interfaces
{
    public interface ISupervisor
    {
        Task<List<object>> obtieneSupervisores(string servidor, int idCartera);
        Task<List<object>> obtieneCuentas(string servidor, int idCartera, DateTime fechaDesde, DateTime fechaHasta);
    }
}
