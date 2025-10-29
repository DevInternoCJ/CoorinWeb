using System.ComponentModel.DataAnnotations;
using Loki.DTOs.GeneralesDTOs;

namespace Loki.DTOs.GeneralesDTOs
{
    public class SearchGeneral
    {
        public string Servidor { get; set; }
        public int? IdCartera { get; set; }
        public int? IdProducto { get; set; }
        public string? Concepto { get; set; }
        public int? IdConsulta { get; set; }
        public bool EsDetalleResultado { get; set; } = false;
        public bool EsCuentasResultado { get; set; } = false;
        public bool EsContarResultado { get; set; } = false;
        public IEnumerable<ParameterDto>? ParametrosExtra { get; set; }
        public IEnumerable<AgruparDTO>? AgrupamientoExtra { get; set; }
        public DateTime? Desde { get; set; }
    }

}
