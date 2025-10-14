using System;
using System.Text.Json.Serialization;

namespace Loki.DTOs.Informacion.OfrecimientosDTOs
{
	/// <summary>
	/// Representa la estructura de datos devuelta por la función de base de datos fn_Ofrecimientos.
	/// Las propiedades nullable reflejan el uso de LEFT JOINs en la consulta original.
	/// </summary>
	public class OfrecimientoDto
	{
		// --- Columnas de la tabla Ofrecimientos (Generalmente no nulas) ---
		public string Cuenta { get; set; }
		public string Herramienta { get; set; }
		public DateTime Fecha { get; set; }
		public TimeSpan Hora { get; set; }
		public string Ejecutivo { get; set; }
		public decimal MontoRequerido { get; set; }
		public decimal MontoOfrecido { get; set; }
		public decimal Descuento { get; set; }
		public int Plazos { get; set; }
		public decimal Saldo { get; set; }
		public DateTime? FechaCorte { get; set; }

		// --- Columnas de la tabla Negociaciones (pueden ser nulas por LEFT JOIN) ---
		public string? Estado { get; set; }
		public DateTime? FechaAcordada { get; set; }
		public DateTime? FechaFinNegociacion { get; set; }
		public string? CartaConvenio { get; set; }
		public string? CorreoElectronico { get; set; }
		public int? Pagos { get; set; }
		public decimal? MontoPagado { get; set; }
		public decimal? SaldoNegociacion { get; set; }
		public string? Folio { get; set; }

		// --- Propiedades Dinámicas (Vienen de la subconsulta 'CC') ---
		public string? SituacionCuenta { get; set; }
		// ... aquí se mapearían otras columnas dinámicas como 'Gestiones', etc.
	}
}