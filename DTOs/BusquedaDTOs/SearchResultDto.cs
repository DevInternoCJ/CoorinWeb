namespace Loki.DTOs.BusquedaDTOs
{
    public class SearchResultDto
    {
        public string Mensaje { get; set; } = string.Empty;
        public bool EsError { get; set; }
        public List<Dictionary<string, object>>? Datos { get; set; } // Para resultados de conteo (tabla genérica)
        public string? RutaDescargaExcel { get; set; } // Para resultados de detalle
        public int TotalFilasEncontradas { get; set; } // Número total de cuentas encontradas (antes de exportar/mostrar)
    }
}