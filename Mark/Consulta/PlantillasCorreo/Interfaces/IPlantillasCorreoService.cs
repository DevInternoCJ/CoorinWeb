using Loki.DTOs.PlantillasCorreoDTOs;

namespace Loki.Mark.Consulta.PlantillasCorreo.Interfaces
{
    public interface IPlantillasCorreoService
    {

        Task<bool> ActualizarPlantillaAsync(PlantillaCorreoDto plantilla, string servidor, string nombreBaseDatos);
        Task<int>CrearPlantillaAsync(PlantillaCorreoInsert plantilla, string servidor, string nombreBaseDatos);
        Task<bool> EliminarPlantillaAsync(int idCorreoScript, string servidor, string nombreBaseDatos);
        Task<CargaDatos.CargaDatosResponse> CargarDatosCompletos(int idCartera, int idProducto, string servidor, string nombreBaseDatos);

    }
}
