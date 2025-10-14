using System.Text.Json.Serialization;

namespace Loki.DTOs.Informacion.DomicilioDTOs
{
	/// <summary>
	/// Representa la estructura de datos devuelta por la función de base de datos fn_DomiciliosVisitas.
	/// Las propiedades nullable reflejan el uso de LEFT JOINs en la consulta original.
	/// </summary>
	public class DomicilioDto
	{
		// --- Datos de la Cuenta y Domicilio (Generalmente no nulos) ---
		public string Cuenta { get; set; }
		public string NombreDeudor { get; set; }
		public string RFC { get; set; }
		public string Expediente { get; set; }
		public string Calle { get; set; }
		public string NumeroExterior { get; set; }
		public string NumeroInterior { get; set; }
		public string CodigoPostal { get; set; }
		public string ColoniaLocalidad { get; set; }
		public string DelegacionMunicipio { get; set; }
		public string Estado { get; set; }
		public string Informacion { get; set; }

		// --- Datos de Catálogos (Pueden ser nulos por LEFT JOIN) ---
		public string? Clase { get; set; }
		public string? Origen { get; set; }

		// --- Datos de la Última Visita (Pueden ser nulos por LEFT JOIN) ---
		[JsonPropertyName("ÚltimaVisita")]
		public DateTime? UltimaVisita { get; set; }

		public string? Visitador { get; set; }
		public string? Mapeo { get; set; }
		public string? Contacto { get; set; }

		// El alias original es 'Situación', pero el DTO de la subconsulta ya lo llama 'SituacionCuenta'
		// Si el frontend espera 'Situación', puedes añadir [JsonPropertyName("Situación")] aquí.
		public string? Situacion { get; set; }

		public DateTime? FechaPagoNegociacion { get; set; }
		public decimal? MontoNegociacion { get; set; }
		public string? Herramienta { get; set; }

		// --- Propiedades Dinámicas (Vienen de la subconsulta 'CC') ---
		// Estas propiedades adicionales se llenarán si la consulta incluye un 'idConsulta'
		//public string? SituacionCuenta { get; set; }
		// ... aquí se mapearían otras columnas dinámicas como 'Gestiones', etc.
	}
}
