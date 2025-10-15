using System.Collections;
using System.Data;
using CoorinWeb.Loki.Global;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Consulta.Cuenta.Interfaces
{
    public interface ICatalogosServiceRe
    {
        //Task<bool> ActualizaTodosCatálogosAsync(IDbContextFactory dbContextFactory, string servidor, string
        //, bool chkSanta = true);
        Task<bool> CargarCarterasProductosAsync(string servidor, string tipoBase);
        Task<DataTable> EjecutarConsultaAsync(SqlConnection conn, string query, string nombreTabla);
        Task<bool> CargarCatalogosAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase);
        Task<DataTable> CargarUsuariosRHAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase, string usuarioRH);
        Task<DataTable> CargarEvidenciaAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase);
        Task<bool> CargarVersionamientoAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase);
        Task CargarColumnasProductoAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase, object idProducto, object? idCartera = null, bool chkSanta = true);
        Hashtable RelacionesCatalogo(int idValor2);
        DataTable TablaBit();
        DataTable ValoresDelCatalogo(string nombreCatalogo);
        DataTable ValoresDelCatalogo(int idCatalogo);
        DataTable ValoresDelCatalogo(int idCatalogo1, int idValor2Relacion);
        Task<DataTable> ProductoColumnasAsync(
        IDbContextFactory dbContextFactory,
        string servidor,
        string tipoBase,
        object idProducto,
        object? idCartera = null,
        bool chkSanta = true);
        int IdCartera(int idProducto);
        string Valor(int idValor);
        DataSet ObtenerDataSet();
    }
}
