namespace Loki.DTOs.CamposPantallaDTOs
{
	public class CampoPantallaRequest
	{
		public int IdProducto { get; set; }
		public int IdEjecutivo { get; set; }
		public int Jerarquia { get; set; }
		public List<CampoItemDto> Campos { get; set; } = new();
	}


}
