using System.Threading.Tasks;
using Loki.DTOs.CampaniasDTOs;
using Microsoft.AspNetCore.Mvc;

namespace Loki.Mark.Administracion.Campanias.Interfaces
{
	public interface ICarterasService
	{
		Task<List<object>> GetCarteras(string servidor, string tipobase);
		Task<List<object>> GetCarterasProductos(string servidor, string tipobase);
		
		Task<dynamic?> FilasRestantesPorCampaña(int idcampaña, string servidor);
        Task<IEnumerable<dynamic>?> Top100Filas(int idcampaña, string servidor);

    }
}
