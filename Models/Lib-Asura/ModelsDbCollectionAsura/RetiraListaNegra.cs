using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class RetiraListaNegra
{
    public string? IdCartera { get; set; }

    public DateOnly? FechaRetira { get; set; }

    public int? IdEjecutivoInsert { get; set; }

    public string? Concepto { get; set; }

    public string? Dato { get; set; }
}
