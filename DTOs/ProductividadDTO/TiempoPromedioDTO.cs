namespace Loki.DTOs.ProductividadDTO
{
    public class TiempoPromedioDTO
    {
        public string Encargado { get; set; }
        public string Ejecutivo { get; set; }
        public TimeSpan? Negociaciones { get; set; }
        public TimeSpan? Cuentas { get; set; }
        public TimeSpan? Titulares { get; set; }
        public TimeSpan? Conocidos { get; set; }
        public TimeSpan? Desconocidos { get; set; }
        public TimeSpan? SinContacto { get; set; }
    }
}
