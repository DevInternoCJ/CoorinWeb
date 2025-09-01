using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class VwCarterasProducto
{
    public short IdCartera { get; set; }

    public string Cartera { get; set; } = null!;

    public string? Abreviación { get; set; }

    public short IdProducto { get; set; }

    public string Producto { get; set; } = null!;
}
