// Ubicación: /Mark/Reportes/Cliente/DTOs/ReporteDefinicionDto.cs
namespace Loki.DTOs.Reportes.ClienteDTOs
{
	/// <summary>
	/// Describe un reporte disponible para el cliente, incluyendo los parámetros que requiere.
	/// </summary>
	public class ReporteDefinicionDto
	{
		public short IdReporte { get; set; }
		public string Reporte { get; set; }
		public string Descripcion { get; set; }
		public short IdCartera { get; set; }
		public bool RequiereProducto { get; set; }
		public bool RequiereDesde { get; set; }
		public bool RequiereHasta { get; set; }
		// Se podrían añadir más flags si hubiera más parámetros opcionales (ej. RequiereSegmento)
	}
}