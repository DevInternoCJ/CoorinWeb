using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryAsura;

public partial class ActlProducto123
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }
}
