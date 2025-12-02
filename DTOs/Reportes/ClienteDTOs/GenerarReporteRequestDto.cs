using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.Reportes.ClienteDTOs
{
	/// <summary>
	/// Parámetros para generar un reporte dinámico al cliente.
	/// </summary>
	public class GenerarReporteRequestDto
	{
		[Required]
		public short IdReporte { get; set; }

		// Parámetros opcionales (el servicio validará si son requeridos por el IdReporte)
		public int? IdProducto { get; set; }
		public DateTime? FechaDesde { get; set; }
		public DateTime? FechaHasta { get; set; }
		public string? Segmento { get; set; } // Ejemplo si hubiera un parámetro de segmento
											  // Añadir aquí otros parámetros que puedan ser necesarios
	}
}