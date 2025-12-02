using System.Text.Json.Serialization;

namespace Loki.DTOs.Reportes.DiaEjecutivoDTOs
{
	/// <summary>
	/// Representa una entrada en el reporte de tiempos de un ejecutivo,
	/// basado en la salida de fn_TiemposEjecutivoDía.
	/// </summary>
	public class DiaEjecutivoDto
	{
		// --- Columnas devueltas por la función ---

		// La función devuelve time(0), que mapea a TimeSpan en C#
		public TimeSpan HoraInicio { get; set; }

		public TimeSpan? HoraFin { get; set; }

		// Mantenemos el nombre C# sin tilde, pero usamos JsonPropertyName para el JSON
		[JsonPropertyName("Duración")]
		public TimeSpan? Duracion { get; set; }

		public TimeSpan? TiempoEnCuenta { get; set; }

		// Mantenemos el nombre C# sin tilde
		[JsonPropertyName("Acción")]
		public string Accion { get; set; }

		public string? Modo { get; set; } // Puede ser NULL para "Inicia" y "Cierra"

		public string? Resultado { get; set; }

		public string? Cuenta { get; set; } // Puede ser NULL para pausas y sesión

		// Mantenemos el nombre C# sin tilde
		[JsonPropertyName("Teléfono")]
		public string? Telefono { get; set; } // Puede ser NULL o ''
	}
}