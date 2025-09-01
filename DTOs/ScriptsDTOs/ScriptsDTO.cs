namespace Loki.DTOs.ScriptsDTOs
{
	public class ScriptsDTO
	{
		public ScriptsDTO()
		{
		}
		public ScriptsDTO(short idScript, short idProducto, string nombre, string descripción, string script1, DateOnly fechaInsert, int idEjecutivoInsert)
		{
			IdScript = idScript;
			IdProducto = idProducto;
			Nombre = nombre;
			Descripción = descripción;
			Script1 = script1;
			FechaInsert = fechaInsert;
			IdEjecutivoInsert = idEjecutivoInsert;
		}
		public short IdScript { get; set; }

		public short IdProducto { get; set; }

		public string Nombre { get; set; } = null!;

		public string Descripción { get; set; } = null!;

		public string Script1 { get; set; } = null!;

		public DateOnly FechaInsert { get; set; }

		public int IdEjecutivoInsert { get; set; }
	}
}
