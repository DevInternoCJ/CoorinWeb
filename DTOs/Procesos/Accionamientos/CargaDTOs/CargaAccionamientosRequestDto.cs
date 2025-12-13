// Ubicación: /Mark/Procesos/Accionamientos/DTOs/CargaAccionamientosRequestDto.cs
using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.Procesos.Accionamientos.CargaDTOs
{
    public class CargaAccionamientosRequestDto
    {
        public required int IdCartera { get; set; }
        public required int IdAcercamiento { get; set; } // Ej. 1606 (SMS), 1607 (Email)
        public required string NombrePaquete { get; set; }
        public required string Descripcion { get; set; }
        public required bool UsarComplemento { get; set; }

        // Parámetros opcionales para lógica específica (ej. SMS Amex)
        public bool EsActualizacion { get; set; }
        public bool TieneTipoMensaje { get; set; } // chkTipoM

        // Esta propiedad recibe el archivo binario desde el frontend
        public required IFormFile ArchivoExcel { get; set; }
    }
}