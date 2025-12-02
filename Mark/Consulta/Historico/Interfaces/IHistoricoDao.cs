using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.Common;
using static Loki.DTOs.HistoricoDTOs.Consulta;

namespace Loki.Mark.Consulta.Historico.Interfaces
{
    public interface IHistoricoDao
    {
        Task<DataSet> BuscarCuentasIndividual(string cuenta, ConsultaBaseRequest parametros, string servidor);
        //Task<DataTable> EjecutarConsultaSimple(DbConnection connection, string query, string cuenta, ConsultaBaseRequest parametros);
        Task<DataTable> EjecutarConsultaSimple(DbConnection connection, string query, string cuenta, ConsultaBaseRequest parametros, string tablaNombre, bool ignorarPeriodo = false);

        Task<DataSet> BuscarCuentasArchivo(DataTable cuentas, ConsultaBaseRequest parametros, string servidor, string tempTable);

    }
}
