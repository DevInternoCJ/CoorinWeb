using System.Text.Json.Serialization;

namespace Loki.DTOs.SesionesDTOs
{
	public class EjecutivoPropio
	{
		[JsonPropertyOrder(1)]
		public required string Usuario { get; set; }
		[JsonPropertyOrder(2)]
		public required string NombreEjecutivo { get; set; }
		[JsonPropertyOrder(3)]
		public required int IdEjecutivo { get; set; }
		[JsonPropertyOrder(4)]
		public required int? IdEncargado { get; set; }
		[JsonPropertyOrder(5)]
		public required int? Jerarquía { get; set; }
		[JsonPropertyOrder(6)]
		public required bool? Bloqueado { get; set; }
	}

}
