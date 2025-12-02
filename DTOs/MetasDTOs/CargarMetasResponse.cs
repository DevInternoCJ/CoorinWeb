using System.Data;

namespace Loki.DTOs.MetasDTOs
{
    public class CargarMetasResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public List<Dictionary<string, object>>? Errores { get; set; }
    }

}
