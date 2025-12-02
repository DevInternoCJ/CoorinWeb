namespace Loki.DTOs.CampaniasDTOs
{
    public class CargaArchivoRequest
    {
        public IFormFile Archivo { get; set; }
        public int IdCampania { get; set; }
        public int? IdCartera { get; set; }
    }
}
