using Loki.DTOs.EjecutivosDTO;
using Microsoft.AspNetCore.Mvc;

namespace Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces
{
    public interface IMetasDAOs
    {

        Task<ActionResult<MetasResponse>> EstableceMetaEjecutivo(EjecutivosMetasDto model, string servidor);

    }
}
