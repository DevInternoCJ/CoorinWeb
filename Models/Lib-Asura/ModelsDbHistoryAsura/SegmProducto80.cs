using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryAsura;

public partial class SegmProducto80
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? SaldoaNegociar30Días { get; set; }
}
