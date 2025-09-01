using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class VPlazo
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public decimal MontoPago { get; set; }

    public int IdEjecutivo { get; set; }

    public bool? Cumplido { get; set; }

    public DateOnly FechaPago { get; set; }

    public DateOnly FechaInicioPlazo { get; set; }

    public DateOnly FechaFinPlazo { get; set; }

    public decimal? SumaPagos { get; set; }

    public byte? Pagos { get; set; }

    public bool Válido { get; set; }

    public byte? Ordinal { get; set; }
}
