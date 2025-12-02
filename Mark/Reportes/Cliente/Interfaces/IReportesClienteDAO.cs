// Ubicación: /Mark/Reportes/Cliente/DAOs/IReportesClienteDAO.cs
using Loki.DTOs.Reportes.ClienteDTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Loki.Mark.Reportes.Cliente.DAOs
{
	public interface IReportesClienteDAO
	{
		/// <summary>
		/// Obtiene la lista de definiciones de reportes activos, mapeados a un DTO.
		/// </summary>
		Task<IEnumerable<ReporteDefinicionDto>> GetReporteDefinicionesAsync(string servidor);

		/// <summary>
		/// Ejecuta dinámicamente un reporte (SP o Función) y devuelve sus resultados.
		/// </summary>
		Task<Dictionary<string, IEnumerable<dynamic>>> GenerarReporteAsync(string servidor, dynamic definicion, GenerarReporteRequestDto parametros);
	}
}