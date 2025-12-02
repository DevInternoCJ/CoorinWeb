using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class SegmProducto17
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Tipocredito { get; set; }
}
