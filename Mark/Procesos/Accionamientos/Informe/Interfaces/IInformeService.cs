using Loki.DTOs.Procesos.Accionamientos;
using Loki.DTOs.Procesos.Accionamientos.InformeDTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Loki.Mark.Procesos.Accionamientos.Informe.Interfaces
{
    public interface IInformeService
    {
        Task<IEnumerable<dynamic>> ConsultarInformeAsync(string servidor, InformeRequestDto request);
    }
}