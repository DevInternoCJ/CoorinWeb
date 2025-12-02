using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class HusoHorarioMex
{
    public string Estado { get; set; } = null!;

    public int Invierno { get; set; }

    public int Verano { get; set; }

    public bool _1invierno0Verano { get; set; }
}
