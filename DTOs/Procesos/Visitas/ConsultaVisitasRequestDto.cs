using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.Procesos.Visitas
{
    public class ConsultaVisitasRequestDto
    {
        [Required]
        public int IdCartera { get; set; }

        public int IdConsulta { get; set; } // 0 para "Todas"

        [Required]
        public DateTime FechaDesde { get; set; }

        [Required]
        public DateTime FechaHasta { get; set; }

        public bool IncluirComplemento { get; set; } // Equivalente a chkComplemento
    }
}