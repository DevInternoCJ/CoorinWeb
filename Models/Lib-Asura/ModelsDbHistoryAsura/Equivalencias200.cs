using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class Equivalencias200
{
    public short IdValor { get; set; }

    public byte Ponderación { get; set; }

    public string CódigoResultado { get; set; } = null!;

    public bool EsVencida { get; set; }
}
