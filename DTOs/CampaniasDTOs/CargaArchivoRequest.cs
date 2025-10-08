namespace Loki.DTOs.CampaniasDTOs
{
    public class CargaArchivoRequest
    {
        public int IdCampania { get; set; }
        public int? IdCartera { get; set; }
        public IFormFile Archivo { get; set; } = null!;
    }
}
