namespace Loki.DTOs.CampaniasDTOs
{
    public class CampaniaInfo
    {
        public int IdCampania { get; set; }
        public string NombreCampania { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
    }
}
