namespace Loki.DTOs.SupervisorDTO
{
    public class AsignarCuentasRequest
    {
        public int idCartera { get; set; }
        public int idConsulta { get; set; }
        public int iFilas { get; set; }
        public List<EjecutivoDto> ejecutivos { get; set; }
    }
}
