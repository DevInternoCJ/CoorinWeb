namespace Loki.DTOs.ProductividadDTO
{
    public class PorcentajesDTO
    {
        public string Encargado { get; set; }
        public string Ejecutivo { get; set; }
        public decimal? Negociacion { get; set; }
        public decimal? Gestion { get; set; }
        public decimal? Entrada { get; set; }
        public decimal? Titulares { get; set; }
        public decimal? Conocidos { get; set; }
        public decimal? Desconocidos { get; set; }
        public decimal? SinContacto { get; set; }
    }
}
