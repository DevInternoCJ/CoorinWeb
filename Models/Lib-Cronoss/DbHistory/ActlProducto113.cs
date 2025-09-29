using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class ActlProducto113
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Ln { get; set; }

    public string? Dias { get; set; }

    public string? SVencido { get; set; }

    public string? SInsoluto { get; set; }
}
