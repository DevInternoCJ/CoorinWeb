using System.Collections.Generic;

namespace Loki.DTOs.CamposPantallaDTOs
{
	public class GuardarCamposResult
	{
		public bool Exito { get; set; }
		public string Mensaje { get; set; }
		public List<string> Errores { get; set; } = [];
	}
}