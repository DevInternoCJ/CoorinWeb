using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class Equivalencias200
{
    public short IdValor { get; set; }

    public byte Ponderación { get; set; }

    public string CódigoResultado { get; set; } = null!;

    public bool EsVencida { get; set; }
}
