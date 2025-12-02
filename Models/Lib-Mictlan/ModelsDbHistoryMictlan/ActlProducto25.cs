using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class ActlProducto25
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }
}
