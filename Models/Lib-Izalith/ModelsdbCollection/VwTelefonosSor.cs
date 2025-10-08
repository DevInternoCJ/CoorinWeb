using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class VwTelefonosSor
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public short IdProducto { get; set; }

    public long NúmeroTelefónico { get; set; }

    public short IdClase { get; set; }
}
