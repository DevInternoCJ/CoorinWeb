using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

public partial class Chist
{
    public short IdCartera { get; set; }

    public DateOnly? Cambio { get; set; }

    public string Idcuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly VálidoHasta { get; set; }

    public short IdProducto { get; set; }

    public DateOnly Desdech { get; set; }

    public DateOnly Hastach { get; set; }
}
