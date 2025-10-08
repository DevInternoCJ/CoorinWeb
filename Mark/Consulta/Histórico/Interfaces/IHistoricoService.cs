using Loki.DTOs.HistoricoDTOs;
using System.Data;
using static Loki.DTOs.HistoricoDTOs.Consulta;

namespace Loki.Mark.Consulta.Histórico.Interfaces
{
    public interface IHistoricoService
    {

        Task<DataSet> BuscarCuentaIndividualAsync(ConsultaIndividualRequest request, string servidor);
        Task<ExcelResponse> GenerarExcelAsync(DataSet data);
        void ValidarRequest(ConsultaBaseRequest request);
        Task<DataSet> BuscarCuentasPorArchivoAsync(HistoricoArchivo request, string servidor, string idEjecutivo);

    }
}
