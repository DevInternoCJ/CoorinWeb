using System.Collections;
using System.Data;
using CoorinWeb.Loki.Global;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Consulta.Cuenta.Interfaces
{
    public interface ICatalogosServiceRe
    {
        Task<bool> CargarCarterasProductosAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase);

        Task<DataTable> EjecutarConsultaAsync(SqlConnection conn, string query, string nombreTabla);
        Task<bool> CargarCatalogosAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase);
        Task<DataTable> CargarUsuariosRHAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase, string usuarioRH);

        Task<DataTable> CargarEvidenciaAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase);

        Task<bool> CargarVersionamientoAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase);

        Task CargarColumnasProductoAsync(IDbContextFactory dbContextFactory,string servidor, string tipoBase,object idProducto,object? idCartera = null,bool chkSanta = true);
        Hashtable RelacionesCatalogo(int idValor2);
    }
}
