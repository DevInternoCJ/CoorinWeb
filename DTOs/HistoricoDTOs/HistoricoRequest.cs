namespace Loki.DTOs.HistoricoDTOs
{
    public class HistoricoRequest
    {
        public string idcuenta { get; set; }

        public int IdCartera { get; set; }
        // Se recomienda quitar este campo si idCuenta ya se pasa por la URL del endpoint
        // public int idCuenta { get; set; }
        public List<string> TipoConsulta { get; set; }
        public DateTime? Desde { get; set; }
        public DateTime? Hasta { get; set; }
    }
}
