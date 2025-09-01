using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class ActlProducto12
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? FechaDeAlta { get; set; }

    public string? CarteraVencida { get; set; }
}
