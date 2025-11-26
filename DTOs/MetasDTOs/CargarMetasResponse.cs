using System.Data;

namespace Loki.DTOs.MetasDTOs
{
    public class CargarMetasResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public DataTable? Errores { get; set; }
    }
}
