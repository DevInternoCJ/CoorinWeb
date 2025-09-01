using System.Text.Json.Serialization;

namespace Loki.DTOs.SesionesDTOs
{
	public class EjecutivoConJerarquia : EjecutivoPropio
	{
		[JsonPropertyOrder(5)]

		public bool SesionAbierta { get; set; }

		[JsonPropertyOrder(99)]
		public List<EjecutivoConJerarquia> Subordinados { get; set; } = [];
	}
}
