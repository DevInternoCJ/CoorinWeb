using Loki.DTOs.GeneralesDTOs;

namespace Loki.Mark.Consulta.Generales.Interfaces
{
    public interface IGeneralesService
    {
        Task<List<HerramientaDTO>> CargaHerramienta(int idCartera, string servidor);
        Task<List<string>> CargaMunicipios(int idCartera, string servidor);

    }
}
