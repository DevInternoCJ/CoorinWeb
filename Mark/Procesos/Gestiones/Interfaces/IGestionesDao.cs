using Loki.DTOs.GestionesDTOs;

namespace Loki.Mark.Procesos.Gestiones.Interfaces
{
    public interface IGestionesDao
    {
        Task<(bool success, string message)> actualizaComentario(string servidor, ActualizaComentarioRequest request);
    }
}
