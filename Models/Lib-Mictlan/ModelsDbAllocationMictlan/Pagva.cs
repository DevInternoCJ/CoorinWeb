using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

public partial class Pagva
{
    public string Idcuenta { get; set; } = null!;

    public long? Dupl { get; set; }

    public int IdPago { get; set; }

    public DateOnly FechaInsert { get; set; }

    public decimal MontoPago { get; set; }

    public DateOnly FechaPago { get; set; }

    public string? Segmentación { get; set; }

    public string? Referencia { get; set; }
}
