using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.GespaDTOs
{
    public class InsertaExpediente
    {
        [Required]
        public string IdCuenta { get; set; } = string.Empty; // Recibe el expediente (ej: "BAN12345")

        public int IdCartera { get; set; }

        [Required]
        public string Comentario { get; set; } = string.Empty;

        public int IdEjecutivo { get; set; }

        public int Situacion { get; set; } // 1 para actualizar situación

        public int IdSituacion { get; set; }

        public bool EsExpediente { get; set; }
    }
}
