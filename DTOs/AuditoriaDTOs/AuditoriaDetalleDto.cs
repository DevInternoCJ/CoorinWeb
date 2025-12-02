namespace Loki.DTOs.AuditoriaDTOs
{
    public class AuditoriaDetalleDto
    {
        public string Cartera { get; set; }
        public string Producto { get; set; }
        public int Cuenta { get; set; }
        public string Expediente { get; set; }
        public string SituacionCuenta { get; set; }
        public DateTime? Fecha_CambioActivacion { get; set; }
        public string Estado { get; set; }
        public int TotalGestiones { get; set; }
        public DateTime? PrimerGestion { get; set; }
        public int TotalVisitas { get; set; }
        public DateTime? PrimerVisita { get; set; }
        public int TotalCartas { get; set; }
        public DateTime? PrimeraCarta { get; set; }
        public int TotalSMS { get; set; }
        public DateTime? PrimerSMS { get; set; }
        public int TotalBlaster { get; set; }
        public DateTime? PrimerBlaster { get; set; }
        public int TotalCorreos { get; set; }
        public DateTime? PrimerCorreo { get; set; }
        public int TotalTelegrama { get; set; }
        public DateTime? PrimerTelegrama { get; set; }
        public int DiasTranscurridos { get; set; }
        public DateTime? UltimaNegociacion { get; set; }
        public DateTime? PrimerLlamadaDespuesDeNegociacion { get; set; }
        public DateTime? PrimerLlamadaDespuesDeFechaAcordada { get; set; }
        public string Tipo { get; set; }
    }

}
