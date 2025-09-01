using Loki.DTOs.EjecutivosDTO;
using Microsoft.AspNetCore.Mvc;

namespace Loki.Mark.Administracion.Ejecutivos.Validadores.Interfaces
{
    public interface IValidadoresDAOs
    {
        Task<string> InsertaEliminaValidadores(ValidadoresRequest dto, string servidor);     
        Task<string> InsertaEliminaValidadoresArrepentimientos(ValidadoresRequest dto, string servidor);
    }
}
