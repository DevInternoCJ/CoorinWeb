using Loki.DTOs.PlantillasCorreoDTOs;

namespace Loki.Mark.Consulta.PlantillasCorreo.Interfaces
{
    public interface IPlantillasCorreoDao
    {
        Task<bool> ActualizarPlantillaAsync(PlantillaCorreoDto plantilla, string servidor, string nombreBaseDatos);
        Task<int> InsertarPlantillaAsync(PlantillaCorreoInsert plantilla, string servidor, string nombreBaseDatos);
        Task<bool> EliminarPlantillaAsync(int idCorreoScript, string servidor, string nombreBaseDatos);
        //carga datos
        Task<List<PlantillaCorreoDto>> ObtenerPlantillasPorProducto(int idProducto, string servidor, string nombreBaseDatos);
        Task<bool> VerificarTablaProducto(int idProducto, string servidor, string nombreBaseDatos);
        Task<Dictionary<string, object>> ObtenerEjemploProducto(int idProducto, string servidor, string nombreBaseDatos);
        Task<Dictionary<string, object>> ObtenerEjemploCuenta(int idCartera, string servidor, string nombreBaseDatos);
    }
}
