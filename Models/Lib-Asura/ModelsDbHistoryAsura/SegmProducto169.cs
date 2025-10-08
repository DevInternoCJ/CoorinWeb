using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class SegmProducto169
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Cliente { get; set; }

    public string? Producto { get; set; }

    public string? FechaCarga { get; set; }

    public string? Corte { get; set; }

    public string? FecApertura { get; set; }
}
