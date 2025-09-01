namespace Loki.Mark.Administracion.Gespa.Catalogos.Interfaces
{
	public interface ICatalogosService
	{
		Task<List<object>> GetAllCatalogos(string servidor);
		Task<List<object>> GetAllValoresCatalogos(string servidor);
	}
}
