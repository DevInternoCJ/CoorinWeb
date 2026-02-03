using Loki.DTOs.GespaDTOs;

namespace Loki.Mark.Procesos.Gespa.Bloqueo_cuentas.Interfaces
{
    public interface IBloqueoCuentasGespaDAOs
    {
        Task<dynamic?> ValidateBloqueoCuentasBusqueda(BloqueoCuentasBusqueda request, string servidor);
        Task<dynamic?> ValidateBloqueoCuentas(BloqueoCuentasBusqueda request, string servidor);


    }
}
