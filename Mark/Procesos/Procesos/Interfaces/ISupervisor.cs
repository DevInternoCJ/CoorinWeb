namespace Loki.Mark.Procesos.Procesos.Interfaces
{
    public interface ISupervisor
    {
        Task<List<object>> obtieneSupervisores(string servidor, int idCartera);

    }
}
