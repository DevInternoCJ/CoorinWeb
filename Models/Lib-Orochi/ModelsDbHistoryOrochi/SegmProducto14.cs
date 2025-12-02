using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.History;

public partial class SegmProducto14
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Idpersona { get; set; }

    public string? Poblacion { get; set; }

    public string? Entfed { get; set; }

    public decimal? Montorenta { get; set; }

    public string? Plazo { get; set; }

    public string? Producto { get; set; }

    public string? Fechamasantigua { get; set; }
}
