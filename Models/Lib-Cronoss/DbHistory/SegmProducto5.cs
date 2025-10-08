using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class SegmProducto5
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly? Insert { get; set; }

    public float? Ciclo { get; set; }

    public string? Estado { get; set; }

    public string? Plaza { get; set; }

    public string? Region { get; set; }

    public string? Division { get; set; }

    public string? Prestamo { get; set; }

    public string? CartIni { get; set; }

    public string? Producto { get; set; }
}
