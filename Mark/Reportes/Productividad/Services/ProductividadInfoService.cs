using Dapper;
using Loki.DTOs.Reportes.ProductividadDTOs;
using Loki.Mark.Reportes.Productividad.DAOs;

namespace Loki.Mark.Reportes.Productividad.Services
{
	public class ProductividadInfoService : IProductividadInfoService
	{
		private readonly IProductividadInfoDAO _dao;

		public ProductividadInfoService(IProductividadInfoDAO dao)
		{
			_dao = dao;
		}

		/// <summary>
		/// Orquesta la consulta del reporte de productividad.
		/// </summary>
		public async Task<IEnumerable<ProductividadDto>> ConsultarProductividadAsync(string servidor, ProductividadRequestDto request)
		{
			var parametros = new DynamicParameters();
			parametros.Add("idCartera", request.IdCartera);
			parametros.Add("idProducto", request.IdProducto);
			parametros.Add("FechaProductividadInicial", request.FechaInicial);
			parametros.Add("FechaProductividadFinal", request.FechaFinal);

			return await _dao.ObtenerProductividadAsync(servidor, parametros);
		}
	}
}