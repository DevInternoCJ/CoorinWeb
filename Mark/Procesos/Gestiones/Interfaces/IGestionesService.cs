namespace Loki.Mark.Procesos.Gestiones.Interfaces
{
    public interface IGestionesService
    {
        Task<List<object>> buscaComentarios(string servidor, int idCartera, string cuenta);
        Task<List<object>> RealizaBusqueda(string servidor, int idCartera, DateTime fechaInicial, DateTime fechaFinal, int jerarquia, int? idProducto = null);
        Task<List<object>> buscarGestiones(string servidor, int idCartera, string idCuenta);
    }
}
