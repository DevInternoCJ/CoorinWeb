using System;
using System.Text.Json.Serialization;

namespace Loki.DTOs.Informacion.ComentariosDTOs
{
	/// <summary>
	/// Representa un comentario o nota registrada en una cuenta, basado en la salida de fn_Comentarios.
	/// </summary>
	public class ComentarioDto
	{
		// --- Columnas devueltas por la función fn_Comentarios ---
		public int IdCartera { get; set; }
		public string Cuenta { get; set; }
		public string Expediente { get; set; }

		// El nombre de la propiedad en C# es más descriptivo
		[JsonPropertyName("Fecha_Insert")]
		public DateTime FechaComentario { get; set; }

		[JsonPropertyName("Segundo_Insert")]
		public TimeSpan HoraComentario { get; set; }

		public string Ejecutivo { get; set; }

		// Un campo de texto libre siempre es un buen candidato para ser nullable
		public string? Comentario { get; set; }

		// --- Propiedades Dinámicas (Vienen de la subconsulta 'CC') ---
		// Estas propiedades adicionales se llenarán si la consulta incluye un 'idConsulta'
		public string? SituacionCuenta { get; set; }
		// ... aquí se mapearían otras columnas dinámicas como 'Gestiones', etc.
	}
}