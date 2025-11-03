using Loki.DTOs.Informacion.ComentariosDTOs;
using Loki.DTOs.Informacion.PagosDTOs; // Reutilizamos el DTO de Pagos

namespace Loki.Mark.Consulta.Informacion.Comentarios.Services
{
	public interface IComentariosService
	{
		/// <summary>
		/// Orquesta la consulta de comentarios de cuentas, aplicando filtros dinámicos.
		/// </summary>
		Task<IEnumerable<dynamic>> ConsultarComentariosAsync(string servidor, ConsultaPagosRequest request);
	}
}