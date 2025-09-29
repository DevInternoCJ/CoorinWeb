using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.SesionesDTOs
{
	public class IdEjecutivoRequest
	{
		[Required(ErrorMessage = "El campo 'idEjecutivo' es obligatorio.")]
		public int IdEjecutivo { get; set; } = 0;

	}
}
