namespace Loki.Mark.Consulta.Informacion.PagosReportados.Interfaces
{
	public interface IPagosReportadosDAO
	{
		Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros);
	}
}
