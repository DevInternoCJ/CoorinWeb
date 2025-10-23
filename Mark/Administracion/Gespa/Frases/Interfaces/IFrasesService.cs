namespace Loki.Mark.Administracion.Gespa.Frases.Interfaces
{
    public interface IFrasesService
    {
        Task<List<object>> GetFrasesMotivacion(string servidor, int idEjecutivo);
    }
}
