// Ubicación: /Mark/Procesos/Accionamientos/DTOs/CargaAccionamientosResponseDto.cs
using System.Collections.Generic;

namespace Loki.DTOs.Procesos.Accionamientos.CargaDTOs
{
    public class CargaAccionamientosResponseDto
    {
        public int TotalRegistrosLeidos { get; set; }
        public int TotalRegistrosCargados { get; set; }
        public int TotalErrores { get; set; }
        public required string Mensaje { get; set; }

        // Lista de errores devueltos por el SP (ej. Expedientes no encontrados)
        // En lugar de crear un archivo Excel de errores en el servidor,
        // devolvemos los datos para que el frontend los muestre o genere el Excel.
        public List<dynamic> RegistrosConError { get; set; } = new();
    }
}