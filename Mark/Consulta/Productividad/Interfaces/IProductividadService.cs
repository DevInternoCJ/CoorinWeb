
using Loki.DTOs.ProductividadDTO;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Loki.Mark.Consulta.Productividad.Interfaces
{
    public interface IProductividadService
    {
        Task<DTOs.ProductividadDTO.ProductividaddDTO> ObtenerProductividad(string indicador, int? ejecutivoId, string Servidor);
        Task<ProductividaddDTO> ObtenerProductividadConCommand(string indicador, int? ejecutivoId, string servidor);
        //Task<DataTable> CrearTablaEjecutivos(SqlConnection connection, int idEjecutivo);
    }

}
