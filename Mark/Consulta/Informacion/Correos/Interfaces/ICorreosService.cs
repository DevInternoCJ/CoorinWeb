using Loki.DTOs.Informacion.CorreosDTOs;

namespace Loki.Mark.Consulta.Informacion.Correos.Services
{
	public interface ICorreosService
	{
		/// <summary>
		/// Orquesta la consulta de correos, aplicando filtros de cuentas dinámicas.
		/// </summary>
		Task<IEnumerable<CorreoDto>> ConsultarCorreosAsync(string servidor, int idCartera, int idConsulta);
	}
}