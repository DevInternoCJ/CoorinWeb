using Loki.DTOs.EjecutivosDTO;
using Microsoft.AspNetCore.Mvc;

namespace Loki.Mark.Administracion.Ejecutivos.Validadores.Interfaces
{
    public interface IValidadoresService
    {
       
        Task<IEnumerable<ValidadoresDTO>?> ObtieneValidadoresArrepentimientos(int idProducto, string servidor, string tipoBase);
        Task<IEnumerable<ValidadoresDTO>?> ObtieneValidadores(int idProducto, string servidor, string tipoBase);

    }
}
