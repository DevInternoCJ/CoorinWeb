namespace Loki.DTOs.GeneralesDTOs
{
    public class SearchResultDto
    {
        public string Mensaje { get; set; }
        public bool EsError { get; set; }
        public int TotalFilasEncontradas { get; set; }
        public string RutaDescargaExcel { get; set; }
        public List<Dictionary<string, object>> Datos { get; set; } = new();
    }
}
