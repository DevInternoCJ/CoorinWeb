using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.Informacion.PagosDTOs
{
	public class ConsultaPagosRequest
	{
		[Range(1, int.MaxValue, ErrorMessage = "El idCartera es requerido.")]
		public int IdCartera { get; set; }
		public int IdConsulta { get; set; }
		public int IdProducto { get; set; }
		public DateTime Desde { get; set; }
		public DateTime Hasta { get; set; }
		[Range(0, 4, ErrorMessage = "La jerarquía es requerida.")]
		public int Jerarquia { get; set; }
	}
}
