using Loki.DTOs.GestionesDTOs;
using System.Data;

namespace Loki.Mark.Procesos.Gestiones.Interfaces
{
    public interface IGestionesDao
    {
        Task<(bool success, string message)> actualizaComentario(string servidor, ActualizaComentarioRequest request);
        Task<(bool success, string message, DataTable errores)> CargarLlamadasAsync(CargaLlamadasRequest request, string servidor);
        List<Dictionary<string, object>> ConvertDataTableToList(DataTable dt);
    }
}
