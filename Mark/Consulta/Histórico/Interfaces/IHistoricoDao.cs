using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.Common;
using static Loki.DTOs.HistoricoDTOs.Consulta;

namespace Loki.Mark.Consulta.Histórico.Interfaces
{
    public interface IHistoricoDao
    {
        Task<DataSet> BuscarCuentasIndividualAsync(string cuenta, ConsultaBaseRequest parametros, string servidor);
        //Task<DataTable> EjecutarConsultaSimple(DbConnection connection, string query, string cuenta, ConsultaBaseRequest parametros);
        Task<DataTable> EjecutarConsultaSimple(DbConnection connection, string query, string cuenta, ConsultaBaseRequest parametros, string tablaNombre, bool ignorarPeriodo = false);

        Task<DataSet> BuscarCuentasPorArchivoAsync(DataTable cuentas, ConsultaBaseRequest parametros, string servidor, string tempTable);

    }
}
