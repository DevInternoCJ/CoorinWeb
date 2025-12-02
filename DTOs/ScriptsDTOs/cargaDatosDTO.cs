namespace Loki.DTOs.ScriptsDTOs
{
    public class cargaDatosDTO
    {
        public class ResultadoCargaProductoDto
        {
            public bool Exitoso { get; set; }
            public string Mensaje { get; set; }
            public List<ScriptDto> Scripts { get; set; }
            public Dictionary<string, object> EjemploProducto { get; set; }
            public Dictionary<string, object> EjemploCuentas { get; set; }
        }

        public class ScriptDto
        {
            public int IdScript { get; set; }
            public string Nombre { get; set; }
            public string Descripcion { get; set; }
            public string Script { get; set; }
        }

    }
}
