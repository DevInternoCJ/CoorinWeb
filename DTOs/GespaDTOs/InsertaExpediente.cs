using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.GespaDTOs
{
    public class InsertaExpediente
    {
        public string idCuenta { get; set; } // En este caso recibirá el "sExpediente"
        public int idCartera { get; set; }
        public string Comentario { get; set; }
        public int idEjecutivo { get; set; }
        public int situacion { get; set; } // 1 para true, 0 para false (según tu código previo)
        public int idSituacion { get; set; }
        public bool EsExpediente { get; set; }
    }
}
