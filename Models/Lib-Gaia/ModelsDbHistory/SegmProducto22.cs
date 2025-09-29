using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class SegmProducto22
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? FechaAsignación { get; set; }
}
