using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.Procesos.Accionamientos.InformeDTOs
{
    public enum TipoConteoAccionamiento
    {
        Detalle,
        ContarAccionamientos, // "Accionamientos" en el radio button
        ContarCuentas        // "Cuentas" en el radio button
    }

    public class InformeRequestDto
    {
        [Required]
        public int IdCartera { get; set; }
        public int IdConsulta { get; set; } // 0 para "Todas"
        public int IdAcercamiento { get; set; } // 0 para "Todos"
        [Required]
        public DateTime FechaDesde { get; set; }
        [Required]
        public DateTime FechaHasta { get; set; }
        [Required]
        public TipoConteoAccionamiento Conteo { get; set; }
        public bool UsarComplemento { get; set; } // Checkbox "Complemento"
    }
}
