

using Loki.DTOs.GespaDTOs;
using System.Data;

namespace Loki.Mark.Procesos.Gespa.Comentarios.Interfaces
{
    public interface IComentariosGespaDAOs
    {
        Task<dynamic?> ValidateComentario(ComentariosGespacs request, string servidor);
        Task<dynamic> InsertarPorExpediente(InsertaExpediente request, string servidor, int idCarteraEjecutivo);
        Task<CargaComentariosResponse> CargaAccionamientosAsync(DataTable tabla, int idCartera, int idEjecutivo, string servidor);

    }
}
