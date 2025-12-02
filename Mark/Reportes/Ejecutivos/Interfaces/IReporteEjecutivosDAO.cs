using Loki.DTOs.Reportes.EjecutivosDTOs;

namespace Loki.Mark.Reportes.Ejecutivos.DAOs
{
	public interface IReporteEjecutivosDAO
	{
		/// <summary>
		/// Ejecuta el procedimiento almacenado del reporte de ejecutivos.
		/// </summary>
		Task<IEnumerable<ReporteEjecutivoDto>> ObtenerReporteAsync(string servidor, object parametros);
	}
}