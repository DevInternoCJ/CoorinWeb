namespace Loki.DTOs.CamposPantallaDTOs
{
	public class CampoPantallaDto
	{
		public int IdProducto { get; set; }
		public int Posicion { get; set; }
		public string Alias { get; set; } = "";
		public string NombreCampo { get; set; } = "";
		public string FormatoCampo { get; set; } = "";
		public bool Resaltado { get; set; } = false;
		public string Editar { get; set; } = "Insert";
		public int IdEjecutivo { get; set; }
	}


}
