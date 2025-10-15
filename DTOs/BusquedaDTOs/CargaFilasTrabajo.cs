using System.Text.Json.Serialization;

namespace Loki.DTOs.BusquedaDTOs
{
    public class CargaFilasTrabajo
    {
        public int IdCampania { get; set; } //prb alan web 5
        public int? IdConsulta { get; set; }
        public int IdCartera { get; set; }
        public bool IncluirCuenta { get; set; }
        public bool IncluirUsuario { get; set; } = false;
        [JsonIgnore]
        public bool IncluirTelefono { get; set; } = false;
        public List<ParametroDto> Parametros { get; set; } = new();
        public List<AgruparDto> Agrupar { get; set; } = new();


    }
}
