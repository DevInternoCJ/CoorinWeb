namespace Loki.DTOs.QueysDTOs
{
	public class AccionamientosReportParams
	{
		public int IdCartera { get; set; }
		public int IdConsulta { get; set; }
		public int ConteoTipo { get; set; } // 0 = ContarCuentas, 1 = ContarAccionamientos, 2 = Detalle
		public DateTime Desde { get; set; }
		public DateTime Hasta { get; set; }
		public string BaseDatos { get; set; }
		public int IdAcercamiento { get; set; }
	}
}
