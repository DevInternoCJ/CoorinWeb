namespace Loki.DTOs.Informacion.PagosDTOs
{
	/// <summary>
	/// Representa el resultado de la función de base de datos fn_PagosNegociaciones.
	/// Las propiedades nullable reflejan el uso de LEFT JOINs en la consulta.
	/// </summary>
	public class PagoNegociacionDto
	{
		// Columnas de la tabla de Pagos (vw_Pagos)
		public string Cuenta { get; set; }
		public DateTime FechaPago { get; set; }
		public decimal MontoPago { get; set; }
		public string? Referencia { get; set; }
		public string? Segmentacion { get; set; }
		public string? Producto { get; set; }

		// Columnas de la tabla de Negociaciones (unidas por LEFT JOIN)
		public DateTime? CreacionNegociacion { get; set; }
		public DateTime? FechaAcordada { get; set; }
		public DateTime? FechaFinNegociacion { get; set; }
		public decimal? MontoNegociado { get; set; }
		public decimal? SaldoNegociacion { get; set; }
		public string? HerramientaOfrecida { get; set; }
		public string? Usuario { get; set; }
		public string? EstadoNegociacion { get; set; }

		// Columna calculada
		public string? PorcentajeCumplimiento { get; set; }
	}
}
