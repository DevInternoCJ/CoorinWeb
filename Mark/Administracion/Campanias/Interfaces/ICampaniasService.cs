namespace Loki.Mark.Administracion.Campanias.Interfaces
{
	public interface ICampaniasService
	{
		Task<List<object>> GetCarteras(string servidor);

		Task<List<object>> GetCarterasProductos(string servidor);

    }
}
