namespace Loki.DTOs.ProductividadDTO
{
    public class PorcentajesDTO
    {
        public int? EncargadoId { get; set; }
        public int? IdEjecutivo { get; set; }
        public decimal? Negociación { get; set; }
        public decimal? Gestión { get; set; }
        public decimal? Entrada { get; set; }
        public decimal? Titulares { get; set; }
        public decimal? Conocidos { get; set; }
        public decimal? Desconocidos { get; set; }
        public decimal? SinContacto { get; set; }
    }
}
