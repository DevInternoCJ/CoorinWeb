namespace Loki.DTOs.GespaDTOs
{
    public class ComentariosGespacs
    {
        public int? situacion { get; set; }
        public int? idSituacion { get; set; }
        public int? idCartera { get; set; }
        public string? idCuenta { get; set; }
        public string? Comentario { get; set; }
        public int? idEjecutivo { get; set; }
        public string? Servidor { get; set; }

        public class ResultadoComentario
        {
            public string Mensaje { get; set; }
            public int? Éxito { get; set; }
        }
    }
}
