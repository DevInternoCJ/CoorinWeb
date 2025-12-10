namespace Loki.DTOs.ProductividadDTO
{
    public class SesionesRawDTO
    {
        public string Encargado { get; set; }
        public string Ejecutivo { get; set; }
        public string Extensión { get; set; }
        public DateTime? Ingreso { get; set; }    // Recibe el 1900-01-01T...
        public DateTime? Salida { get; set; }
        public DateTime? PrimerGestión { get; set; }
        public string Modo { get; set; }
        public TimeSpan? TiempoEnModo { get; set; }
    }
}
