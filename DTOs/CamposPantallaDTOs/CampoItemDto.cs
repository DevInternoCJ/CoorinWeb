namespace Loki.DTOs.CamposPantallaDTOs
{
	public class CampoItemDto
	{
		public int Posicion { get; set; }
		public string Alias { get; set; } = string.Empty;
		public string NombreCampo { get; set; } = string.Empty;
		public string FormatoCampo { get; set; } = string.Empty;
		public bool Resaltado { get; set; } = false;
		public string Editar { get; set; } = "Insert"; // "Insert" o "Update"
	}


}
