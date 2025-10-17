namespace Loki.DTOs.FrasesDTOs
{
	public class FrasesDTO
	{
        public int? IdEjecutivo { get; set; }
        public int? IdCartera { get; set; }
        public int? IdProducto { get; set; }
        public string TextoFrase { get; set; } = null!;
    }
}
