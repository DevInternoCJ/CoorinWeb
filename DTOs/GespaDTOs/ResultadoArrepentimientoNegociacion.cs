namespace Loki.DTOs.GespaDTOs
{
    public class ResultadoArrepentimientoNegociacion
    {
        public string? cuenta { get; set; }
        public DateTime? fechaCreacion { get; set; }
        public string? horaCreacion { get; set; }
        public string? herramienta { get; set; }
        public string? nombreEjecutivo { get; set; }
        public string? idEjecutivo { get; set; }
        public string? validador { get; set; }
        public string? estado { get; set; }
        public decimal? montoNegociado { get; set; }
        public decimal? saldoNegociacion { get; set; }
        public string? plazos { get; set; }
        public string? cartaConvenio { get; set; }
        public DateTime? fechaAcordada { get; set; }
    }
}
