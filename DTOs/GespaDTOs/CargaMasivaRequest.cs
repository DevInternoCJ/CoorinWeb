namespace Loki.DTOs.GespaDTOs
{
    public class CargaMasivaRequest
    {
        public int idCartera { get; set; }
        public int idEjecutivo { get; set; }
        public List<ComentarioMasivoDTO> Lista { get; set; }
    }
}
