using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class SegmProducto60
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? GrupoDeLaCuenta { get; set; }
}
