using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class SegmProducto21
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Operación { get; set; }

    public string? Cartera { get; set; }
}
