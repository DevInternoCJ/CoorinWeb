namespace Loki.DTOs.Informacion.DatosErroneos
{
	public class DatosErroneosRequestDto
	{
		public int IdCartera { get; set; }
		public int IdDatoErroneo { get; set; } // 0 para "Todos"
		public DateTime Desde { get; set; }
		public DateTime Hasta { get; set; }
	}
}
