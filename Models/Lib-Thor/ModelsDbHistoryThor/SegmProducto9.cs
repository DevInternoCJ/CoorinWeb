using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class SegmProducto9
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Delegacion { get; set; }

    public string? Estatus { get; set; }

    public string? DescEtiq { get; set; }
}
