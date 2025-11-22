using Loki.DTOs.GestionesDTOs;
using System.Data;

namespace Loki.Mark.Procesos.Gestiones.Interfaces
{
    public interface IGestionesDao
    {
        Task<(bool success, string message)> actualizaComentario(string servidor, ActualizaComentarioRequest request);
        Task<int> EditarGestion(string servidor, int idCartera, string idCuenta, DateTime fecha, TimeSpan hora, string comentario, int idEjecutivo);
    }
}
