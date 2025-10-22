

namespace Loki.DTOs.Reportes.ProductividadDTOs
{
	/// <summary>
	/// Define los parámetros para solicitar el reporte de productividad.
	/// </summary>
	public class ProductividadRequestDto
	{
		public int IdCartera { get; set; }
		public int? IdProducto { get; set; } // Nullable, como en el original
		public DateTime FechaInicial { get; set; }
		public DateTime FechaFinal { get; set; }
	}
}