namespace Loki.DTOs.InfoEjecutivoDTO
{
    public class ConsultaDTO
    {
        public int idConsulta { get; set; }
        public string NombreConsulta { get; set; }
        public int idProducto { get; set; }
        public int idCartera { get; set; }
        public DateTime Desde { get; set; }
    }
}
