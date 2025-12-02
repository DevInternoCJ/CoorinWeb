using Loki.DTOs.EncargadosDTOs;

namespace Loki.Mark.Administracion.Ejecutivos.Encargados.Interfaces
{
    public interface IEncargadosDao
    {
        Task<dynamic?> CambiaEncargadoEjecutivo(string servidor, CambiaEncargadoDto request);
    }
}