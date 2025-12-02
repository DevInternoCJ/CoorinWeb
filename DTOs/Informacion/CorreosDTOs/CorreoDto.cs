using System;
using System.Text.Json.Serialization;

namespace Loki.DTOs.Informacion.CorreosDTOs
{
	/// <summary>
	/// Representa la estructura de datos devuelta por la función fn_CorreosCartera.
	/// Las propiedades nullable reflejan el uso de LEFT JOINs en la consulta.
	/// </summary>
	public class CorreoDto
	{
		// --- Columnas principales (generalmente no nulas por INNER JOINs) ---
		public string Cuenta { get; set; }
		public string NombreDeudor { get; set; }
		public string RFC { get; set; }
		public string Expediente { get; set; }
		public string CorreoElectronico { get; set; }
		public int IdCartera { get; set; }
		public DateTime FechaAlta { get; set; }
		public string EjecutivoAlta { get; set; }

		[JsonPropertyName("Orígen")]
		public string Origen { get; set; }

		[JsonPropertyName("Información")]
		public string Informacion { get; set; }

		// --- Columnas que pueden ser nulas (por LEFT JOIN o definición de tabla) ---
		[JsonPropertyName("EjecutivoInformación")]
		public string? EjecutivoInformacion { get; set; }

		[JsonPropertyName("FechaHora_Información")]
		public DateTime? FechaHora_Informacion { get; set; }

		// --- Propiedades Dinámicas (Vienen de la subconsulta 'CC') ---
		// Estas propiedades adicionales se llenarán si la consulta incluye un 'idConsulta'
		//public string? SituacionCuenta { get; set; }
		// ... aquí se mapearían otras columnas dinámicas como 'Gestiones', etc.
	}
}