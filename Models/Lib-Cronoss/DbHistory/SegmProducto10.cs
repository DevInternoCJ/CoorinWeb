using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class SegmProducto10
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? GenericoPll { get; set; }

    public string? DescSegmento { get; set; }

    public string? Nomestado { get; set; }

    public string? Producto { get; set; }

    public string? MesCastigo { get; set; }

    public string? Dictamenrap { get; set; }

    public string? Grupo { get; set; }

    public string? Generico { get; set; }

    public string? PortafolioModificado { get; set; }
}
