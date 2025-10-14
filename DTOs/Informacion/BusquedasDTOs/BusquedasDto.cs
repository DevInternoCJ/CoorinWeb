using System;
using System.Text.Json.Serialization;

namespace Loki.DTOs.Informacion.BusquedasDTOs
{
	/// <summary>
	/// Representa la estructura de datos devuelta por la función de base de datos fn_BúsquedasPeriodo.
	/// Las propiedades nullable reflejan el uso de LEFT JOINs o columnas que pueden ser nulas en la consulta.
	/// </summary>
	public class BusquedaDto
	{
		// --- Columnas principales ---
		public string Cartera { get; set; }
		public string Cuenta { get; set; }

		[JsonPropertyName("Fecha Búsqueda")]
		public DateTime FechaBusqueda { get; set; }

		[JsonPropertyName("Hora Búsqueda")]
		public TimeSpan HoraBusqueda { get; set; }

		[JsonPropertyName("Ejecutivo Búsqueda")]
		public string EjecutivoBusqueda { get; set; }

		[JsonPropertyName("Dato buscado")]
		public string DatoBuscado { get; set; }

		public string Fuente { get; set; }
		public string Encontrado { get; set; }
		public int NumeroTelefonosEncontrados { get; set; }

		// --- Columnas que pueden ser nulas ---
		public string? NumeroTelefonico { get; set; }
		public string? NombrePersona { get; set; }
		public string? Puesto { get; set; }
		public string? NombreLugar { get; set; }
		public string? DomicilioLugar { get; set; }
		public string? Link { get; set; }

		// --- Propiedades Dinámicas (Vienen de la subconsulta 'CC') ---
		//public string? SituacionCuenta { get; set; }
		// ... aquí se mapearían otras columnas dinámicas como 'Gestiones', etc.
	}
}