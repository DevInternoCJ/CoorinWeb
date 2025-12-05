namespace Loki.DTOs.ProductividadDTO
{
    public class ProductividadRequest
    {
        public string Indicador { get; set; }
        public List<int> IdsEjecutivos { get; set; }
        public int? IdEjecutivoPrincipal { get; set; }
        public bool EsModoHora { get; set; }
    }
}
