namespace CoorinWeb.Loki.DTOs.AuthDTOs
{
	public class ValidatePasswordEjecutivoRequest
	{
		public required string Servidor { get; set; } = default!;
		public required int IdEjecutivo { get; set; }
		public required string Contrasenia { get; set; } = default!;
	}
}
