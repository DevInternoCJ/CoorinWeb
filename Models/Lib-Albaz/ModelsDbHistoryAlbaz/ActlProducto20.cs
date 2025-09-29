using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.History;

public partial class ActlProducto20
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }
}
