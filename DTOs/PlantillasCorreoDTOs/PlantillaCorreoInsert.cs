namespace Loki.DTOs.PlantillasCorreoDTOs
{
    public class PlantillaCorreoInsert
    {
        public int? IdProducto { get; set; }
        public string Nombre { get; set; }
        public string Asunto { get; set; }
        public string Mensaje { get; set; }
        public int IdEjecutivo { get; set; }
    }
}
