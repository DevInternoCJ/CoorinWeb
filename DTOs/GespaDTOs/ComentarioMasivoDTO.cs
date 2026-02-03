namespace Loki.DTOs.GespaDTOs
{
    public class ComentarioMasivoDTO
    {
        public string Cuenta { get; set; }

        // Columna 1 en tu Excel: Fecha
        public string Fecha { get; set; }

        // Columna 2 en tu Excel: Segundo_insert
        public string Segundo_insert { get; set; }

        // Columna 3 en tu Excel: idEjecutivo
        public int idEjecutivo { get; set; }

        // Columna 4 en tu Excel: Comentario
        public string Comentario { get; set; }
    }
}
