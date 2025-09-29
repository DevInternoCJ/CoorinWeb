using System.Text.Json.Serialization;

namespace Loki.DTOs.EjecutivosDTO
{
    public class ProductividadDTO
    {
        // Constructor sin parámetros (requerido por Dapper)
        public ProductividadDTO()
        {
        }

        public ProductividadDTO(int IdEjecutivo,  short Cuentas, short Titulares,
                                byte Negociaciones, byte Cumplimientos, decimal MontoCumplido, decimal SaldoSolucionado,
                                TimeSpan HoraEntrada, TimeSpan HoraSalida, string Segmento, string server)
        {
            this.IdEjecutivo = IdEjecutivo;
            //this.FechaUpdate = FechaUpdate;
            this.Cuentas = Cuentas;
            this.Titulares = Titulares;
            this.Negociaciones = Negociaciones;
            this.Cumplimientos = Cumplimientos;
            this.MontoCumplido = MontoCumplido;
            this.SaldoSolucionado = SaldoSolucionado;
            this.HoraEntrada = HoraEntrada;
            this.HoraSalida = HoraSalida;
            this.Segmento = Segmento;
            this.server = server;
        }

        public int IdEjecutivo { get; set; }

        //public DateOnly FechaUpdate { get; set; }

        public short? Cuentas { get; set; }

        public short? Titulares { get; set; }

        public byte? Negociaciones { get; set; }

        public byte? Cumplimientos { get; set; }

        public decimal? MontoCumplido { get; set; }

        public decimal? SaldoSolucionado { get; set; }

        public TimeSpan? HoraEntrada { get; set; }

        public TimeSpan? HoraSalida { get; set; }

        public string? Segmento { get; set; }
        [JsonIgnore]
        public string server { get; set; }

    }
}