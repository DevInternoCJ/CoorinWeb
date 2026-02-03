namespace Loki.DTOs.GespaDTOs
{
    public class CargaComentariosResponse
    {
        public bool Success { get; set; }
        public int Total { get; set; }
        public int Insertados { get; set; }
        public int Incorrectos { get; set; }
        public string Message { get; set; }
        public List<dynamic> Errores { get; set; } = new List<dynamic>();
    }
}
