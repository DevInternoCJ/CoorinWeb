namespace Loki.DTOs.CampaniasDTOs
{
    public class CampañaAvanceDTO
    {
        public int idCampaña { get; set; }
        public int NumeroCuentas { get; set; }
        public int Restantes { get; set; }
        public string Avance { get; set; } = string.Empty;
    }
}
