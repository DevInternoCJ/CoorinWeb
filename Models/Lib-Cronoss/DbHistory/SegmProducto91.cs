using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class SegmProducto91
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Ciclo { get; set; }
}
