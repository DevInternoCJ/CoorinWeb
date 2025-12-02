namespace Loki.DTOs.GespaDTOs
{
    public class ResultadoArrepentimientoReporteDePago
    {
        public string? cuenta { get; set; }
        public string? cartera { get; set; }
        public DateTime? fecha { get; set; }
        public string? hora { get; set; }
        public string? nombreEjecutivo { get; set; }
        public string? claveEjecutivo { get; set; }
        public decimal? monto { get; set; }
        public string? sucursal {  get; set; }
        public string? etapa { get; set; }
    }
}
