namespace Loki.DTOs.CamposPantallaDTOs
{
	public class CampoItemDto
	{
		public int Posicion { get; set; }
		public string Alias { get; set; } = string.Empty;
		public string NombreCampo { get; set; } = string.Empty;
		public int FormatoCampo { get; set; } = 1;
		public int Resaltado { get; set; } = 0;
		public bool Editar { get; set; } = false; // "Insert" o "Update"
	}


}
