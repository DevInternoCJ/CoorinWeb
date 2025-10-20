using Loki.DTOs.GeneralesDTOs;

namespace Loki.DTOs.GeneralesDTOs
{
    public class SearchGeneral
    {
        public string Servidor { get; set; } = string.Empty;

        public int? IdCartera { get; set; }
        public int? IdProducto { get; set; }
        public bool EsDetalleResultado { get; set; } = false;  
        public bool EsCuentasResultado { get; set; } = false; 
        public bool EsContarResultado { get; set; } = false;  

        public int? IdConsulta { get; set; }

        public IEnumerable<ParameterDto>? ParametrosExtra { get; set; }

        public IEnumerable<AgruparDTO>? AgrupamientoExtra { get; set; }
    }

}
