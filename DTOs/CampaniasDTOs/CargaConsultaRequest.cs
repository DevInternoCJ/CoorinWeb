using Newtonsoft.Json;

namespace Loki.DTOs.CampaniasDTOs
{
    public class CargaConsultaRequest
    {
        public int IdCampania { get; set; }
        public int? IdConsulta { get; set; }
        [JsonIgnore]
        public string? ConsultaGeneral { get; set; }
        [JsonIgnore]
        public bool IncluirUsuario { get; set; }
        [JsonIgnore]
        public bool IncluirTelefono { get; set; }
        public int IdCartera { get; set; } 
    }
}
