using System.Text.Json.Serialization;

namespace Loki.DTOs.Informacion.DatosErroneosDTOs
{
	public class DatoErroneoDto
	{
		public string Producto { get; set; }
		public string Cuenta { get; set; }
		public string NombreDeudor { get; set; }
		public string RFC { get; set; }
		public string NumeroCliente { get; set; }
		public decimal Saldo { get; set; } // Devolvemos el tipo de dato real
		public string Reporto { get; set; }

		[JsonPropertyName("DatoErróneo")]
		public string DatoErroneo { get; set; }
	}
}
