namespace Loki.Mark.Administracion.Gespa.CamposPantalla.Interfaces
{
	public interface ICamposPantallaService
	{
		Task<int?> ObtenerObjectIdProductoAsync(string servidor, int idProducto);
		Task<List<object>> GetCamposPantalla(string servidor, int idProducto);
		Task<List<object>> GridProductoTableSample(string servidor, int idProducto, double porcentaje = 70, int? maximo = 5);
	}
}
