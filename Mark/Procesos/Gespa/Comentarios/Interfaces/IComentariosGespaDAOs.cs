

using Loki.DTOs.GespaDTOs;

namespace Loki.Mark.Procesos.Gespa.Comentarios.Interfaces
{
    public interface IComentariosGespaDAOs
    {
        Task<dynamic?> ValidateComentario(ComentariosGespacs request);


    }
}
