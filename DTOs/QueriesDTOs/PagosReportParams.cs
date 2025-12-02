namespace Loki.DTOs.QueysDTOs
{
	public class PagosReportParams
	{
		public int IdCartera { get; set; }
		public DateTime Desde { get; set; }
		public DateTime Hasta { get; set; }
		public int IdConsulta { get; set; }
	}
}
