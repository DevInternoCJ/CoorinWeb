namespace Loki.DTOs.ProductividadDTO
{
    public class ProductividadRequest
    {
        public string Indicador { get; set; }
        public List<int> IdsEjecutivos { get; set; } = new List<int>();
        public bool EsModoHora { get; set; } = false;
        public int? IdEjecutivoPrincipal { get; set; }
    }
}
