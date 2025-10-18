using Loki.DTOs.GeneralesDTOs;

namespace Loki.DTOs.GeneralesDTOs
{
    public class SearchGeneral
    {
        // Información del servidor y contexto
        public string Servidor { get; set; } = string.Empty;

        public int? IdCartera { get; set; }
        public int? IdProducto { get; set; }

        // Tipos de búsqueda
        public bool EsDetalleResultado { get; set; } = false;   // Para usar Resultado.Detalle
        public bool EsCuentasResultado { get; set; } = false;   // Para usar Resultado.Cuentas
        public bool EsContarResultado { get; set; } = false;    // Para usar Resultado.Contar

        // Consulta predefinida (opcional)
        public int? IdConsulta { get; set; }

        // Parámetros extra desde el front
        public IEnumerable<ParameterDto>? ParametrosExtra { get; set; }

        // Agrupamientos extra desde el front
        public IEnumerable<AgruparDTO>? AgrupamientoExtra { get; set; }
    }

}
