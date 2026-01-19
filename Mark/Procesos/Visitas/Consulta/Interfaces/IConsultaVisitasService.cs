using Loki.DTOs.Procesos.Visitas;
namespace Loki.Mark.Procesos.Visitas.Consulta.Services
{
    public interface IConsultaVisitasService
    {
        Task<IEnumerable<dynamic>> ConsultarVisitasAsync(string servidor, ConsultaVisitasRequestDto request);
    }
}