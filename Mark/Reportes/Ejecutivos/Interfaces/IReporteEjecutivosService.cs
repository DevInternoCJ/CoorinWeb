using Loki.DTOs.Reportes.EjecutivosDTOs;

namespace Loki.Mark.Reportes.Ejecutivos.Services
{
	public interface IReporteEjecutivosService
	{
		/// <summary>
		/// Orquesta la consulta del reporte de productividad de ejecutivos.
		/// </summary>
		Task<IEnumerable<ReporteEjecutivoDto>> ConsultarReporteAsync(string servidor, ReporteEjecutivosRequestDto request);
	}
}