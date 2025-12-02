namespace Loki.Mark.Consulta.Informacion.Domicilios.Interfaces
{
	public interface IDomiciliosDAO
	{

		Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros);

	}
}
