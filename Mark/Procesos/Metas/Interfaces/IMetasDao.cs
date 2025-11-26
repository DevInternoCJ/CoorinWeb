using Loki.DTOs.MetasDTOs;
using System.Data;

namespace Loki.Mark.Procesos.Metas.Interfaces
{
    public interface IMetasDao
    {
        Task<Bloqueo> Bloqueo(string usuario, string servidor);
        Task<CargarMetasResponse> cargarMetas(CargarMetasRequest request, int idEjecutivo, string servidor);

    }
}
