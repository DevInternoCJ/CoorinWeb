using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class ActlProducto31
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }
}
