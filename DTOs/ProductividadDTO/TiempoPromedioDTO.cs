namespace Loki.DTOs.ProductividadDTO
{
    public class TiempoPromedioDTO
    {
        public int? EncargadoId { get; set; }
        public int? IdEjecutivo { get; set; }
        public TimeSpan? Negociaciones { get; set; }
        public TimeSpan? Cuentas { get; set; }
        public TimeSpan? Titulares { get; set; }
        public TimeSpan? Conocidos { get; set; }
        public TimeSpan? Desconocidos { get; set; }
        public TimeSpan? SinContacto { get; set; }
    }
}
