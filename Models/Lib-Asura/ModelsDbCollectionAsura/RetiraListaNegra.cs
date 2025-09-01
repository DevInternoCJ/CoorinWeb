using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class RetiraListaNegra
{
    public int? IdCartera { get; set; }

    public DateOnly? FechaRetira { get; set; }

    public int? IdEjecutivoInsert { get; set; }

    public string? Concepto { get; set; }

    public string? Dato { get; set; }
}
