namespace Loki.Mark.Consulta.Informacion.Pagos.Interfaces
{
	public interface IPagosDAO
	{
		/// <summary>
		/// Ejecuta una consulta SQL y mapea los resultados a un tipo genérico T.
		/// </summary>
		/// <typeparam name="T">El tipo de objeto al que se mapearán los resultados.</typeparam>
		/// <param name="servidor">El nombre del servidor para obtener la conexión.</param>
		/// <param name="sql">La consulta SQL parametrizada.</param>
		/// <param name="parametros">El objeto con los parámetros para la consulta.</param>
		/// <returns>Una colección de objetos del tipo T.</returns>
		Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros);
	}
}
