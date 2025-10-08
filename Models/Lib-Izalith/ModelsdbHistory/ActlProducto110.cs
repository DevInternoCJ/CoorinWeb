using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class ActlProducto110
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }
}
