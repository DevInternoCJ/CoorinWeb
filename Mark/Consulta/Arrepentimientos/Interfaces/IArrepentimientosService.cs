

using Loki.DTOs.ArrepentimientoDTO;

namespace Loki.Mark.Administracion.Consulta.Arrepentimientos.Interfaces
{
    public interface IArrepentimientosService
    {
        Task<List<ArrepentimientoDTO>> arrepentimientos(int idCartera, string cuenta, string servidor);

    }
}