using Loki.DTOs.Reportes.ClienteDTOs;
using Swashbuckle.AspNetCore.Filters;

namespace Loki.SwaggerExamples.Reportes
{

	/// <summary>
	/// Ejemplo para el reporte 'Whats App Business' (ID 117).
	/// </summary>
	public class GenerarReporteWhatsAppExample : IExamplesProvider<GenerarReporteRequestDto>
	{
		public GenerarReporteRequestDto GetExamples()
		{
			var fechaReporte = new DateTime(2025, 10, 20);
			return new GenerarReporteRequestDto
			{
				IdReporte = 117,
				IdProducto = null,
				FechaDesde = fechaReporte, // Misma fecha en ambos
				FechaHasta = fechaReporte,
				Segmento = null
			};
		}
	}

	/// <summary>
	/// Ejemplo para el reporte 'Base Teléfonos' (ID 137).
	/// </summary>
	public class GenerarReporteExamples : IExamplesProvider<GenerarReporteRequestDto>
	{
		public GenerarReporteRequestDto GetExamples()
		{
			return new GenerarReporteRequestDto
			{
				IdReporte = 137,
				IdProducto = null,
				FechaDesde = null,
				FechaHasta = null,
				Segmento = null
			};
		}
	}
}