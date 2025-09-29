namespace Loki.Mark.Administracion.Campanias.Interfaces
{
	public interface ICampaniasDao
	{
		Task<List<dynamic>?> GetCampañasEncargado(string servidor, int? idEncargado, short? idCartera = null, short? idProducto = null);

		Task<List<dynamic>?> PatchEnciendeApagaCampañas(string servidor, short idCampaña, bool Encender);
	}
}
