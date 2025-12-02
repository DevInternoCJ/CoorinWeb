using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class RetiraListaNegra
{
    public int IdRetiraLista { get; set; }

    public short IdCartera { get; set; }

    public DateOnly FechaRetira { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public string Concepto { get; set; } = null!;

    public string Dato { get; set; } = null!;
}
