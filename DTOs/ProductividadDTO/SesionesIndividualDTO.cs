namespace Loki.DTOs.ProductividadDTO
{
    public class SesionesIndividualDTO
    {
        public string Extension { get; set; }
        public DateTime? Ingreso { get; set; }
        public DateTime? PrimerGestion { get; set; }
        public string Modo { get; set; }
        public TimeSpan? TiempoEnModo { get; set; }
    }
}
