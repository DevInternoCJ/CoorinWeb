using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class SegmProducto4
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Plaza { get; set; }

    public string? Region { get; set; }

    public string? Division { get; set; }

    public string? Zona { get; set; }

    public string? Prestamo { get; set; }

    public string? Producto { get; set; }

    public string? CartIni { get; set; }

    public string? Ciclo { get; set; }
}
