namespace Loki.DTOs.ProductividadDTO
{
    public class NegociacionesIndividualDTO
    {
        public TimeSpan? Hora { get; set; }
        public int? Negociaciones { get; set; }
        public decimal? MontoNegociaciones { get; set; }
        public decimal? SaldoSolucionado { get; set; }
        public decimal? MontoPromedio { get; set; }
        public decimal? SaldoPromedio { get; set; }
    }
}
