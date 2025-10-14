namespace Loki.Mark.Consulta.Informacion.DatosErroneos.Interfaces
{
	public interface IDatosErroneosDAO
	{
		Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros);
	}
}
