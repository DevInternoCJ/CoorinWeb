using Loki.DTOs.Reportes.ClienteDTOs;

namespace Loki.Mark.Reportes.Cliente.Services
{
	public interface IReportesClienteService
	{
		/// <summary>
		/// Obtiene las definiciones de los reportes disponibles.
		/// </summary>
		Task<IEnumerable<ReporteDefinicionDto>> GetReporteDefinicionesAsync(string servidor);

		/// <summary>
		/// Genera un reporte dinámico basado en su ID y los parámetros proporcionados.
		/// </summary>
		Task<Dictionary<string, IEnumerable<dynamic>>> GenerarReporteAsync(string servidor, GenerarReporteRequestDto request);
	}
}