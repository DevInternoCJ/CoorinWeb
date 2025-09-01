namespace Loki.DTOs.AuditoriaDTOs
{
    public class AuditoriaFilterDto
    {
        public int IdCartera { get; set; }
        public int IdProducto { get; set; }
        public DateTime Desde { get; set; }
        public DateTime Hasta { get; set; }
        public int PageNumber { get; set; } = 1;    // opcional
        public int PageSize { get; set; } = 50;     // opcional
    }

}
