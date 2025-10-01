using System.Threading.Tasks;
using Loki.DTOs.CampaniasDTOs;
using Microsoft.AspNetCore.Mvc;

namespace Loki.Mark.Administracion.Carteras.Interfaces
{
    public interface ICarterasService
    {
        Task<List<object>> GetCarteras(string servidor, string tipobase);
        Task<List<object>> GetCarterasProductos(string servidor, string tipobase);

        Task<IEnumerable<dynamic>?> FilasRestantesPorCampaña(string servidor);
        Task<List<CampañaAvanceDTO>> GetAvanceCompletoCampañas(string servidor, int? idEncargado = null, short? idCartera = null, short? idProducto = null);
        Task<List<Dictionary<string, object>>> Top100Filas(int idCampaña, string servidor);
        Task<IEnumerable<dynamic>?> EjecutivoDeCampaña(int idCampaña, string servidor);


    }
}