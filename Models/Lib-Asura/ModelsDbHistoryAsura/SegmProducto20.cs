using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class SegmProducto20
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Plazo { get; set; }

    public string? Fechafindecuenta { get; set; }

    public string? Descripcion { get; set; }

    public string? Capital { get; set; }

    public string? Tiposeguro { get; set; }

    public string? Primaseguro { get; set; }

    public string? Montoenganche { get; set; }

    public string? Tipocontrato { get; set; }
}
