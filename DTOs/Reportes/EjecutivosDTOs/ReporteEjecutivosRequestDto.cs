
namespace Loki.DTOs.Reportes.EjecutivosDTOs
{
	/// <summary>
	/// Define los parámetros para solicitar el reporte de productividad de ejecutivos.
	/// </summary>
	public class ReporteEjecutivosRequestDto
	{
		public int IdCartera { get; set; }
		public int? IdProducto { get; set; } // Nullable, como en el original
		public string? Encargado { get; set; } // Nullable, como en el original
		public DateTime FechaInicial { get; set; }
		public DateTime FechaFinal { get; set; }
	}
}