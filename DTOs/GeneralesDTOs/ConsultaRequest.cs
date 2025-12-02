namespace Loki.DTOs.GeneralesDTOs
{
    public class ConsultaRequest
    {
        public string Query { get; set; } = string.Empty;
        public int IdCartera { get; set; }
        public bool EsDetalle { get; set; } = false;
    }
}
