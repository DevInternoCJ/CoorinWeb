using static Loki.DTOs.HistoricoDTOs.Consulta;

namespace Loki.DTOs.HistoricoDTOs
{
    public class HistoricoArchivo: ConsultaBaseRequest
    {
        public IFormFile Archivo { get; set; }
    }
}
