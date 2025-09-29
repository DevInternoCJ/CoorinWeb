namespace Loki.DTOs.ProductividadDTO
{
    public class ProductividadRequest
    {
        public string Indicador { get; set; }
        public List<int> IdsEjecutivos { get; set; } = new List<int>();
    }
}
