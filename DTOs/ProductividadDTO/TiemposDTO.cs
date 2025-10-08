namespace Loki.DTOs.ProductividadDTO
{
    public class TiemposDTO
    {
        public string Encargado { get; set; }
        public string Ejecutivo { get; set; }
        public TimeSpan? Sesion { get; set; }
        public TimeSpan? Cuentas { get; set; }
        public TimeSpan? Pausas { get; set; }
        public TimeSpan? Muerto { get; set; }
        public TimeSpan? Consulta { get; set; }
        public TimeSpan? Gestion { get; set; }
        public TimeSpan? Permiso { get; set; }
        public TimeSpan? Curso { get; set; }
        public TimeSpan? Comida { get; set; }
        public TimeSpan? Baño { get; set; }
    }
}
