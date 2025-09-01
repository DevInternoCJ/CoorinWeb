using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class SegmProducto6
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Segmento { get; set; }

    public string? NombreCliente { get; set; }
}
