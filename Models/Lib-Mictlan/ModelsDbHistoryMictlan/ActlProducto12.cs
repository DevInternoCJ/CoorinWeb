using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class ActlProducto12
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? FechaDeAlta { get; set; }

    public decimal? CarteraVencida { get; set; }
}
