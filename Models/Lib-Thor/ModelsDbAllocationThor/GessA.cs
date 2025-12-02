using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsAllocation;

public partial class GessA
{
    public int? Conteo { get; set; }

    public string Cuenta { get; set; } = null!;

    public DateOnly FechaGestion { get; set; }

    public string? Numerotelefonico { get; set; }
}
