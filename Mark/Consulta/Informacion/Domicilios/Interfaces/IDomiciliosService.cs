using Loki.DTOs.Informacion.DomicilioDTOs;
using Loki.DTOs.Informacion.PagosDTOs;

namespace Loki.Mark.Consulta.Informacion.Domicilios.Interfaces
{
	public interface IDomiciliosService
	{
		/// <summary>
		/// Orquesta la consulta de domicilios, aplicando filtros de cuentas dinámicas.
		/// </summary>
		Task<IEnumerable<DomicilioDto>> ConsultarDomiciliosAsync(string servidor, int idCartera, int idConsulta);
	}
}
