using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class Pago
{
    public int IdPago { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public DateOnly FechaPago { get; set; }

    public decimal MontoPago { get; set; }

    public string? Referencia { get; set; }

    public int? IdLogProceso { get; set; }

    public bool? Confirmado { get; set; }

    public string? Segmentación { get; set; }
}
