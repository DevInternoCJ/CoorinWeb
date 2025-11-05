namespace Loki.Mark.Consulta.Informacion.Busquedas.Interfaces
{
	public interface IBusquedasInfoDAO
	{
		/// <summary>
		/// Ejecuta una consulta SQL y mapea los resultados a un tipo genérico T.
		/// </summary>
		Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros);
	}
}