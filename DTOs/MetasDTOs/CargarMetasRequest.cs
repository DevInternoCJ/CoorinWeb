namespace Loki.DTOs.MetasDTOs
{
    public class CargarMetasRequest
    {
        public DateTime FechaMeta { get; set; }
        public List<MetaDetalleDto> DatosMetas { get; set; } = new List<MetaDetalleDto>();
    }
}
