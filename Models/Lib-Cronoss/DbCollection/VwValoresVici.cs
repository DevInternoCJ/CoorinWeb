using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class VwValoresVici
{
    public string StatusViciDial { get; set; } = null!;

    public short IdValor { get; set; }

    public string? Valor { get; set; }
}
