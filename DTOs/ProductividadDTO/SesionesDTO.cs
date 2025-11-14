namespace Loki.DTOs.ProductividadDTO
{
    public class SesionesDTO
    {
        public int? EncargadoId { get; set; }
        public int? IdEjecutivo { get; set; }
        public string Extensión { get; set; }
        public DateTime? Ingreso { get; set; }
        public DateTime? Salida { get; set; }
        public DateTime? PrimerGestión { get; set; }
        public string Modo { get; set; }
        public TimeSpan? TiempoEnModo { get; set; }
    }
}
