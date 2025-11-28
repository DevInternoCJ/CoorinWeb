namespace Loki.DTOs.GestionesDTOs
{
    public class CargarIntentosRequest
    {

            public IFormFile Archivo { get; set; }
            public int IdCartera { get; set; }
            public int IdEjecutivo { get; set; }
        

    }
}
