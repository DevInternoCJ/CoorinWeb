using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class BloqueoMetasEjecutivo
{
    public string Usuario { get; set; } = null!;

    public bool Bloqueo { get; set; }
}
