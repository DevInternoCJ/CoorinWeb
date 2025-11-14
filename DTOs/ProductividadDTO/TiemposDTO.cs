namespace Loki.DTOs.ProductividadDTO
{
    public class TiemposDTO
    {
        public int? EncargadoId { get; set; }
        public int? IdEjecutivo { get; set; }
        public TimeSpan? Sesión { get; set; }
        public TimeSpan? Cuentas { get; set; }
        public TimeSpan? Pausas { get; set; }
        public TimeSpan? Muerto { get; set; }
        public TimeSpan? Consulta { get; set; }
        public TimeSpan? Gestión { get; set; }
        public TimeSpan? Permiso { get; set; }
        public TimeSpan? Curso { get; set; }
        public TimeSpan? Comida { get; set; }
        public TimeSpan? Baño { get; set; }
    }
}
