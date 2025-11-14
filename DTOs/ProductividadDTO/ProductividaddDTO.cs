namespace Loki.DTOs.ProductividadDTO
{
    public class ProductividaddDTO
    {
        public string Indicador { get; set; }
        public int? IdEjecutivo { get; set; }
        public object Datos { get; set; }
        public Dictionary<string, object> Metadata { get; set; } = new();
    }
}
