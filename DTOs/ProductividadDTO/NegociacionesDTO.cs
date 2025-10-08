namespace Loki.DTOs.ProductividadDTO
{
    public class NegociacionesDTO
    {
        public string Encargado { get; set; }
        public string Ejecutivo { get; set; }
        public int? Negociaciones { get; set; }
        public decimal? MontoNegociaciones { get; set; }
        public decimal? SaldoSolucionado { get; set; }
        public decimal? MontoPromedio { get; set; }
        public decimal? SaldoPromedio { get; set; }
    }
}
