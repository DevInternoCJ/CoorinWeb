using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class Nombre
{
    public int Expediente { get; set; }

    public string NombreDeudor { get; set; } = null!;

    public short? IdCartera { get; set; }

    public string? IdCuenta { get; set; }

    public virtual Cuenta? Cuenta { get; set; }
}
