using Loki.DTOs.SesionesDTOs;

namespace Loki.Mark.Administracion.Ejecutivos.Encargados.Interfaces
{
    public interface IEncargadosService
    {
        Task<List<object>> GetAllEncargados(string servidor);
        Task<List<EjecutivoConJerarquia>> JerarquiaEjecutivosPropios(string servidor, int idEjecutivo);
    }
}