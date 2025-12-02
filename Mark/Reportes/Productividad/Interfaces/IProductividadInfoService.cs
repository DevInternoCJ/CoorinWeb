using Loki.DTOs.Reportes.ProductividadDTOs;

namespace Loki.Mark.Reportes.Productividad.Services
{
	public interface IProductividadInfoService
	{
		/// <summary>
		/// Orquesta la consulta del reporte de productividad.
		/// </summary>
		Task<IEnumerable<ProductividadDto>> ConsultarProductividadAsync(string servidor, ProductividadRequestDto request);
	}
}