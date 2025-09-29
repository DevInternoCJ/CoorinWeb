using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class LinkPrueba
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string Link { get; set; } = null!;
}
