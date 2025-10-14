// En: /Mark/Consulta/Informacion/Ofrecimientos/DAOs/IOfrecimientosDAO.cs
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Loki.Mark.Consulta.Informacion.Ofrecimientos.DAOs
{
	public interface IOfrecimientosDAO
	{
		/// <summary>
		/// Ejecuta una consulta SQL y mapea los resultados a un tipo genérico T.
		/// </summary>
		Task<IEnumerable<T>> ObtenerDatosAsync<T>(string servidor, string sql, object parametros);
	}
}