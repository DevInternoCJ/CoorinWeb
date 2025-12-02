using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsBBVA_VGP;

public partial class InventarioAuto
{
    public long IdAuto { get; set; }

    public short IdParte { get; set; }

    public bool Bueno { get; set; }

    public bool Regular { get; set; }

    public bool Malo { get; set; }

    public virtual ValoresCatálogo IdParteNavigation { get; set; } = null!;
}
