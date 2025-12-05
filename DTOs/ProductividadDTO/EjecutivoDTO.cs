namespace Loki.DTOs.ProductividadDTO
{
    public class EjecutivoDTO
    {
        public int IdEjecutivo { get; set; }
        public string Usuario { get; set; }
        public int? IdEncargado { get; set; }
        public string Encargado { get; set; }     
        public byte? Jerarquía { get; set; }
        public string NombreEjecutivo { get; set; }
    }
}
