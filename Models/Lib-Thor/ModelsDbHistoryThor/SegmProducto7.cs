using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class SegmProducto7
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? AgenciaActual { get; set; }

    public string? SegmentoActual { get; set; }

    public string? Estado { get; set; }
}
