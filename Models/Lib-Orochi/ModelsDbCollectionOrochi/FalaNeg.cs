using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class FalaNeg
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public decimal MontoNegociado { get; set; }

    public DateOnly FechaFinNegociación { get; set; }

    public TimeOnly SegundoInsert { get; set; }
}
