using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class Accione
{
    public byte IdAcción { get; set; }

    public string Acción { get; set; } = null!;

    public string? Detalle { get; set; }

    public virtual ICollection<CuentasAcción> CuentasAccións { get; set; } = new List<CuentasAcción>();
}
