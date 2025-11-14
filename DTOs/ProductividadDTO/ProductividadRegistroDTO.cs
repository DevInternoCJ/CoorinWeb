namespace Loki.DTOs.ProductividadDTO
{
    public class ProductividadRegistroDTO
    {
        public string Encargado { get; set; }
        public string Ejecutivo { get; set; }
        public Dictionary<int, decimal> Valores { get; set; }
    }
}
