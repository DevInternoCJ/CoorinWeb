namespace Loki.DTOs.GestionesDTOs
{
    public class CargarLlamadas2Request
    {
        public IFormFile Archivo { get; set; }
        public int IdCartera { get; set; }
        public int IdEjecutivo { get; set; }
        //public string Tabla { get; set; }

    }
}
