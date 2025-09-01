namespace Loki.DTOs.EjecutivosDTO
{
    public class EjecutivosMetasDto
    {
    
            public int IdEjecutivo { get; set; }
            public int Cuentas { get; set; }
            public int Titulares { get; set; }
            public int Negociaciones { get; set; }
            public int Cumplimientos { get; set; }
            public decimal MontoCumplido { get; set; }
            public decimal? SaldoSolucionado { get; set; }
            public string? Segmento { get; set; }
            public TimeSpan? HoraEntrada { get; set; }
            public TimeSpan? HoraSalida { get; set; }
            public int Nuevo { get; set; }
        }
    }

