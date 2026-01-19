
namespace Loki.Mark.Procesos.Visitas.Consulta.DAOs
{
    public interface IConsultaVisitasDAO
    {
        Task<IEnumerable<dynamic>> ObtenerVisitasAsync(string servidor, string sql, object parametros);
    }
}