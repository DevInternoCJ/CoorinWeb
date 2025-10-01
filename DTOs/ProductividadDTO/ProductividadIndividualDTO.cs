namespace Loki.DTOs.ProductividadDTO
{
    public class ProductividadIndividualDTO
    {
        public TimeSpan? Hora { get; set; }
        public int? Cuentas { get; set; }
        public int? Gestiones { get; set; }
        public int? Entrada { get; set; }
        public int? Titulares { get; set; }
        public int? Conocidos { get; set; }
        public int? Desconocidos { get; set; }
        public int? SinContacto { get; set; }
        public int? Negociaciones { get; set; }
        public decimal? MontoNegociaciones { get; set; }
        public decimal? SaldoSolucionado { get; set; }
        public decimal? MontoPromedio { get; set; }
        public decimal? SaldoPromedio { get; set; }
    }
}
