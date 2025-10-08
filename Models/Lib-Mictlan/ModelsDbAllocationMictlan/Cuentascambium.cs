using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

public partial class Cuentascambium
{
    public string Idcuenta { get; set; } = null!;

    public int? Cont { get; set; }

    public short IdCartera { get; set; }

    public DateOnly VálidoHasta { get; set; }
}
