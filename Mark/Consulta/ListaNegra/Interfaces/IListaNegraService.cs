namespace Loki.Mark.Consulta.ListaNegra.Interfaces
{
    public interface IListaNegraService
    {
        Task<bool> listanegra(int idCartera, string selector, string dato, string servidor);
    }
}
