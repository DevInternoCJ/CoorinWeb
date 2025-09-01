using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class ActlProducto17
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Ordnerdat { get; set; }
}
