namespace Loki.DTOs.GestionesDTOs
{
    public class CargaLlamadasResponse
    {
        public bool Success { get; set; }
        public int Total { get; set; }
        public int Insertados { get; set; }
        public int Incorrectos { get; set; }
        public object Errores { get; set; }
        public string Message { get; set; }
    }
}
