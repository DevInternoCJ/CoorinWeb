using Loki.DTOs.Informacion.DatosErroneos;
using Loki.DTOs.Informacion.DatosErroneosDTOs;

namespace Loki.Mark.Consulta.Informacion.DatosErroneos.Interfaces
{
	public interface IDatosErroneosService
	{
		/// <summary>
		/// Orquesta la consulta de datos reportados como erróneos, construyendo y ejecutando la consulta SQL.
		/// </summary>
		/// <param name="servidor">El servidor donde se ejecutará la consulta, obtenido del claim del token.</param>
		/// <param name="request">El DTO que contiene los parámetros de la petición, como la cartera, el tipo de dato y el rango de fechas.</param>
		/// <returns>Una colección de DTOs con los resultados de los datos erróneos encontrados.</returns>
		Task<IEnumerable<DatoErroneoDto>> ConsultarDatosErroneosAsync(string servidor, DatosErroneosRequestDto request);
	}
}
