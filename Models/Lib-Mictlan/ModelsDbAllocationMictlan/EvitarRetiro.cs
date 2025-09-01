using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

public partial class EvitarRetiro
{
    public string IdCuenta { get; set; } = null!;

    public string? Agencia { get; set; }

    public string Segmento { get; set; } = null!;
}
