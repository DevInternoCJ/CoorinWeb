using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbAllocation;

public partial class Accione
{
    public byte IdAcción { get; set; }

    public string Acción { get; set; } = null!;

    public string? Detalle { get; set; }

    public virtual ICollection<CuentasAcción> CuentasAccións { get; set; } = new List<CuentasAcción>();
}
