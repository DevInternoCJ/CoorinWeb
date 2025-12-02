namespace Loki.Mark.Consulta.Informacion.Correos.Interfaces
{
	public interface ICorreosDAO
	{
		Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros);
	}
}
