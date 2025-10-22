using Loki.DTOs.Reportes.ProductividadDTOs;

namespace Loki.Mark.Reportes.Productividad.DAOs
{
	public interface IProductividadDAO
	{
		/// <summary>
		/// Ejecuta el procedimiento almacenado del reporte de productividad.
		/// </summary>
		Task<IEnumerable<ProductividadDto>> ObtenerProductividadAsync(string servidor, object parametros);
	}
}