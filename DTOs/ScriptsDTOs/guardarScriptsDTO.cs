namespace Loki.DTOs.ScriptsDTOs
{
    public class guardarScriptsDTO
    {

        public short IdProducto { get; set; }

        public string Nombre { get; set; } = null!;

        public string Descripción { get; set; } = null!;

        public string Script1 { get; set; } = null!;

        public DateOnly? FechaInsert { get; set; } 

        public int IdEjecutivoInsert { get; set; }
    }
}
