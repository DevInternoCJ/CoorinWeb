namespace Loki.DTOs.ProductividadDTO
{
    public class ProductividadResponse
    {
        public string Indicador { get; set; }
        public string Modo { get; set; }
        public int TotalRegistros { get; set; }

        // Una sola propiedad para todos los tipos de datos
        public object Datos { get; set; }
    }
}
