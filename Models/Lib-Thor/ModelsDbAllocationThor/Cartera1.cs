using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class Cartera1
{
    public short IdCartera { get; set; }

    public string Cartera { get; set; } = null!;

    public bool Activo { get; set; }

    public bool CambioProducto { get; set; }

    public bool EliminaPagosMes { get; set; }

    public virtual ICollection<TeléfonosAllocation> TeléfonosAllocations { get; set; } = new List<TeléfonosAllocation>();
}
