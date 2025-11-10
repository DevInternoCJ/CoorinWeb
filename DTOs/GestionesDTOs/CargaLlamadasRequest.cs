namespace Loki.DTOs.GestionesDTOs
{
    public class CargaLlamadasRequest
    {
        public IFormFile Archivo { get; set; }
        public int IdCartera { get; set; }
        public int IdEjecutivo { get; set; }
    }
}
