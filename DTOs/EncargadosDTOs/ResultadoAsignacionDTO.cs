namespace Loki.DTOs.EncargadosDTOs
{
	public class ResultadoAsignacionDto
	{
		public int IdEjecutivo { get; set; }
		public bool Exito { get; set; }
		public string? Mensaje { get; set; } // ¡Clave para informar errores!
	}
}
