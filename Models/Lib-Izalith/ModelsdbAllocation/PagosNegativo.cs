using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbAllocation;

public partial class PagosNegativo
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaPago { get; set; }

    public decimal MontoPago { get; set; }
}
