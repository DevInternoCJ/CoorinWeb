namespace Loki.DTOs.CamposPantallaDTOs
{
	public class CampoPantallaDto
	{
		public int IdProducto { get; set; }
		public int Posicion { get; set; }
		public string Alias { get; set; } = "";
		public string NombreCampo { get; set; } = "";
		public int FormatoCampo { get; set; } = 1;
		public int Resaltado { get; set; } = 0;
		public bool Editar { get; set; } = true;
		public int IdEjecutivo { get; set; }
	}


}
