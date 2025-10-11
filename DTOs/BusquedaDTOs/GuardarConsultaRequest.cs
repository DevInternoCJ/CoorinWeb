namespace Loki.DTOs.BusquedaDTOs
{
    public class GuardarConsultaRequest
    {
        public int idConsulta { get; set; }
        public string NombreConsulta { get; set; }
        public int IdProducto { get; set; }
        public int IdCartera { get; set; }
        public DateTime Desde { get; set; }
        public int IdEjecutivo { get; set; }
        public List<ParametroDto> Parametros { get; set; } = new();
        public List<AgruparDto> Agrupar { get; set; } = new();

    }
}
