namespace Loki.DTOs.ProductividadDTO
{
    public class SesionesDTO
    {
        public string Encargado { get; set; }
        public string Ejecutivo { get; set; }
        public string Extension { get; set; }
        public DateTime? Ingreso { get; set; }
        public DateTime? Salida { get; set; }
        public DateTime? PrimerGestion { get; set; }
        public string Modo { get; set; }
        public TimeSpan? TiempoEnModo { get; set; }
    }
}
