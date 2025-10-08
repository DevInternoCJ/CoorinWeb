using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class EquivalenciasViciDialEst
{
    public string StatusViciDial { get; set; } = null!;

    public short IdValor { get; set; }

    public byte Contestaron { get; set; }

    public string? Tipo { get; set; }
}
