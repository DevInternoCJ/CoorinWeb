using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbAllocation;

public partial class AsigProducto6Tel
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public long? NúmeroTelefónico { get; set; }
}
