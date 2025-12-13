using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.Procesos.Accionamientos.CarteoDTOs
{
    public class CarteoBusquedaDto
    {
        public required string IdCuenta { get; set; }
        public required string Expediente { get; set; }
        public required string NombreDeudor { get; set; }
    }

    public class DomicilioCarteoDto
    {
        public required string IdCuenta { get; set; }
        public required string Domicilio { get; set; }
        public required string CodigoPostal { get; set; } // ValueMember en el combo original
    }

    public class CuentaCarteoResponseDto
    {
        public required CarteoBusquedaDto Cuenta { get; set; }
        public List<DomicilioCarteoDto> Domicilios { get; set; } = new();
    }

    public class GuardarCarteoManualRequestDto
    {
        public required int IdCartera { get; set; }
        public required string IdCuenta { get; set; }
        public required DateTime FechaEnvio { get; set; }
        public required DateTime FechaRechazo { get; set; } // Fecha Devuelto
        public required string Domicilio { get; set; } // Calle_Num
        public required string CodigoPostal { get; set; }
        public required int IdRechazo { get; set; } // Causa Devolución
    }

    public class CargaCarteoRequestDto
    {
        public int IdCartera { get; set; }
        public required string Selector { get; set; } // "cuenta" o "expediente"
        public required IFormFile ArchivoExcel { get; set; }
    }

    public class CargaCarteoResponseDto
    {
        public int TotalRegistrosLeidos { get; set; }
        public int TotalRegistrosInsertados { get; set; } // Calculado (Total - Errores)
        public required string Mensaje { get; set; }
        // Lista dinámica para devolver los errores que retorna el SP de carga
        public required IEnumerable<dynamic> Errores { get; set; }
    }
}
