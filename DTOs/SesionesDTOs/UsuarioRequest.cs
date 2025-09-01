using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.SesionesDTOs
{
	public class UsuarioRequest
	{
		[Required(ErrorMessage = "El campo 'usuario' es obligatorio.")]
		public string Usuario { get; set; } = string.Empty;
	}
}
