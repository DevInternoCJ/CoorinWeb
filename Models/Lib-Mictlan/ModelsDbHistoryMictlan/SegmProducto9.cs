using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class SegmProducto9
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Delegacion { get; set; }

    public string? Estatus { get; set; }

    public string? DescEtiq { get; set; }
}
