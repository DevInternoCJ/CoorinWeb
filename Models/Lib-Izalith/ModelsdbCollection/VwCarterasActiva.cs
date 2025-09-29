using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class VwCarterasActiva
{
    public short IdCartera { get; set; }

    public string Cartera { get; set; } = null!;

    public string? Abreviación { get; set; }

    public bool Complemento { get; set; }

    public string? Gerencia { get; set; }
}
