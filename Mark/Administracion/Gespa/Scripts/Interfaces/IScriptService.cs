using Loki.DTOs.ScriptsDTOs;

namespace Loki.Mark.Administracion.Gespa.Scripts.Interfaces
{
    public interface IScriptService
    {
        Task<cargaDatosDTO.ResultadoCargaProductoDto> CargaDatosProducto(int idCartera, int idProducto, string servidor, string nombreBaseDatos);
    }
}
