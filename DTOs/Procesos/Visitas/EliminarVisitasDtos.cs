using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.Procesos.Visitas
{
    public class EliminarVisitasRequestDto
    {
        [Required]
        public int IdCartera { get; set; }

        [Required]
        public IFormFile ArchivoExcel { get; set; }
    }

    public class EliminarVisitasResponseDto
    {
        public int TotalRegistrosLeidos { get; set; }
        public string Mensaje { get; set; }
        public bool Exito { get; set; }
    }
}