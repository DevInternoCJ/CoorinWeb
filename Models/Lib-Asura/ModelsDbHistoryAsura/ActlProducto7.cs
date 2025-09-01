using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryAsura;

public partial class ActlProducto7
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? MontoAgencia { get; set; }

    public string? PagoMinimo { get; set; }

    public string? SegmentoActual { get; set; }

    public string? MontoMoroso { get; set; }

    public string? PagosVencidos { get; set; }

    public string? TotalDeudor { get; set; }

    public string? FechaAsignacion { get; set; }

    public string? Agencia { get; set; }

    public string? MontoUltimoPago { get; set; }

    public string? FechaUltimoPago { get; set; }

    public string? FechaDesasignacion { get; set; }

    public string? FechaCastigo { get; set; }

    public string? Clasif { get; set; }

    public string? AgenciaActual { get; set; }

    public string? ProductoOrigen { get; set; }
}
