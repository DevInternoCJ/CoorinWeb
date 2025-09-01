using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class ActlProducto22
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }
}
