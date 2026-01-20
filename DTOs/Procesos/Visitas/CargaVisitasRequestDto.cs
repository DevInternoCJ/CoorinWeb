using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.Procesos.Visitas
{
    public class CargaVisitasRequestDto
    {
        [Required]
        public int IdCartera { get; set; }

        public bool UsarComplemento { get; set; }

        public required IFormFile ArchivoExcel { get; set; }
    }

    public class CargaVisitasResponseDto
    {
        public int TotalRegistrosLeidos { get; set; }
        public int TotalRegistrosCargados { get; set; }
        public required string Mensaje { get; set; }
        public required IEnumerable<dynamic> Errores { get; set; }
    }
}