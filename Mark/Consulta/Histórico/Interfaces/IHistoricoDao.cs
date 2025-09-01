using System.Data;
using static Loki.DTOs.HistoricoDTOs.Consulta;

namespace Loki.Mark.Consulta.Histórico.Interfaces
{
    public interface IHistoricoDao
    {
        Task<DataSet> BuscarCuentasIndividualAsync(string cuenta, ConsultaBaseRequest parametros, string servidor);
        Task<DataSet> BuscarCuentasPorArchivoAsync(IEnumerable<string> cuentas, ConsultaBaseRequest parametros, string servidor);
        Task<bool> CrearTablaTemporalAsync(string nombreTabla, string servidor, string nombreBaseDatos);
        Task<bool> InsertarCuentasTemporalAsync(string nombreTabla, IEnumerable<string> cuentas, string servidor, string nombreBaseDatos);
        Task<bool> EliminarTablaTemporalAsync(string nombreTabla, string servidor, string nombreBaseDatos);
    }
}