using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class ValMv
{
    public short IdCartera { get; set; }

    public short IdProducto { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly Fecha { get; set; }

    public decimal SaldoInicial { get; set; }

    public string? PvInicial { get; set; }
}
