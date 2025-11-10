namespace Loki.Mark.Procesos.Gestiones.Interfaces
{
    public interface IGestionesService
    {
        Task<List<object>> buscaComentarios(string servidor, int idCartera, string cuenta);
        Task<List<object>> buscaGestiones(string servidor, int idCartera, DateTime fechaInicial, DateTime fechaFinal);
    }
}
