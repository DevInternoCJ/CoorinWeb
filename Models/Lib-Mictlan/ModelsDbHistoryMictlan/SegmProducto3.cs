using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class SegmProducto3
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Prestamo { get; set; }

    public string? Ciclo { get; set; }

    public string? MontoAper { get; set; }

    public string? FechaAper { get; set; }

    public string? Poblacion { get; set; }

    public string? Estado { get; set; }

    public string? Plaza { get; set; }

    public string? Region { get; set; }

    public string? Division { get; set; }

    public string? Rango { get; set; }
}
