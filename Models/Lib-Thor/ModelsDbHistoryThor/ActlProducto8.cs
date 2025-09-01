using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class ActlProducto8
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? TotalDeudor { get; set; }

    public string? AgenciaActual { get; set; }

    public string? PagosVencidos { get; set; }

    public string? SaldoVencido { get; set; }

    public string? SegmentoActual { get; set; }

    public string? FechaCastigo { get; set; }

    public string? Agencia { get; set; }

    public string? FechaAsignacion { get; set; }

    public string? FechaDesasignacion { get; set; }

    public string? MontoAgencia { get; set; }

    public string? FechaUltimoPago { get; set; }

    public string? MontoUltimoPago { get; set; }

    public string? Clasif { get; set; }
}
