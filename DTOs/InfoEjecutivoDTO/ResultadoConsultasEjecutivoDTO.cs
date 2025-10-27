namespace Loki.DTOs.InfoEjecutivoDTO
{
    public class ResultadoConsultasEjecutivoDTO
    {
        public List<ConsultaDTO> Consultas { get; set; } = new List<ConsultaDTO>();
        public List<ParametroDTO> Parametros { get; set; } = new List<ParametroDTO>();
        public List<AgruparDTO> Agrupar { get; set; } = new List<AgruparDTO>();
    }
}
