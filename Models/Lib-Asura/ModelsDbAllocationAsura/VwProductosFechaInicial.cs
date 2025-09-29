using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class VwProductosFechaInicial
{
    public short IdProducto { get; set; }

    public string Producto { get; set; } = null!;

    public string? FechaInicial { get; set; }

    public short IdCartera { get; set; }
}
