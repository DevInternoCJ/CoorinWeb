using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class CuentasCiclo
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public short IdProducto { get; set; }

    public DateOnly VálidoDesde { get; set; }

    public DateOnly VálidoHasta { get; set; }
}
