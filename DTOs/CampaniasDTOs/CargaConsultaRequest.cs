namespace Loki.DTOs.CampaniasDTOs
{
    public class CargaConsultaRequest
    {
        public int IdCampania { get; set; }
        public int? IdConsulta { get; set; }
        public string? ConsultaGeneral { get; set; }
        public bool IncluirUsuario { get; set; }
        public bool IncluirTelefono { get; set; }
        public int IdCartera { get; set; } 
    }
}
