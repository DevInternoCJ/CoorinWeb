namespace Loki.DTOs.ProductividadDTO
{
    public class ProductividadResponse
    {
        public class SesionDto
        {
            public string? Encargado { get; set; }
            public string? Ejecutivo { get; set; }
            public string? Extension { get; set; }
            public DateTime? Ingreso { get; set; }
            public DateTime? Salida { get; set; }
            public DateTime? PrimerGestion { get; set; }
            public string? Modo { get; set; }
            public TimeSpan? TiempoEnModo { get; set; }
           
        }

      
        public class ContactosDto
        {
            public string? Encargado { get; set; }
            public string? Ejecutivo { get; set; }
            public int? Cuentas { get; set; }
            public int? Gestiones { get; set; }
            public int? Entrada { get; set; }
            public int? Titulares { get; set; }
            public int? Conocidos { get; set; }
            public int? Desconocidos { get; set; }
            public int? SinContacto { get; set; }
        }

        
        public class PivotedProductividadDto
        {
            public string? Encargado { get; set; }
            public string? Ejecutivo { get; set; }
            public int? _6 { get; set; } 
            public int? _7 { get; set; }
            public int? _8 { get; set; }
            public int? _9 { get; set; }
            public int? _10 { get; set; }
            public int? _11 { get; set; }
            public int? _12 { get; set; }
            public int? _13 { get; set; }
            public int? _14 { get; set; }
            public int? _15 { get; set; }
            public int? _16 { get; set; }
            public int? _17 { get; set; }
            public int? _18 { get; set; }
            public int? _19 { get; set; }
            public int? _20 { get; set; }
            public int? _21 { get; set; }
            public int? _22 { get; set; }
           
            public string? TipoFila { get; set; } // Por ejemplo: "Datos", "Total"
        }
    }
}
