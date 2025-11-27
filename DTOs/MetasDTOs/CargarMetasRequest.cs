namespace Loki.DTOs.MetasDTOs
{
    public class CargarMetasRequest
    {
        public IFormFile Archivo { get; set; }
        public DateTime FechaMeta { get; set; }

        public List<MetaDetalleDto> DatosMetas { get; set; }

        public int IdEjecutivo { get; set; }

    }
}
