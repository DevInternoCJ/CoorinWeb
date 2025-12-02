using System.Text.Json.Serialization;

namespace Loki.DTOs.Informacion.PagosReportadosDTOs
{
	public class PagoReportadoDto
	{
		public string Cartera { get; set; }
		public string Cuenta { get; set; }
		public string NombreEjecutivo { get; set; }

		// Mapea la propiedad 'FechaPago' al nombre "Fecha Pago" en el JSON
		//[JsonPropertyName("Fecha Pago")]
		public DateTime FechaPago { get; set; }

		public TimeSpan Hora { get; set; }

		// Mapea 'MontoPago' a "Monto Pago" en el JSON
		//[JsonPropertyName("Monto Pago")]
		public decimal MontoPago { get; set; }
		public string Referencia { get; set; }
		public string Sucursal { get; set; }
	}
}
