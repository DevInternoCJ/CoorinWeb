namespace Loki.DTOs.GestionesDTOs
{
    public class ActualizaComentarioRequest
    {
        public string Comentario { get; set; }
        public string idCuenta { get; set; }
        public int idCartera { get; set; }
        public DateTime FechaOriginal { get; set; }
        public string SegundoInsert { get; set; }
        public DateTime FechaNueva { get; set; }
        
    }
}
