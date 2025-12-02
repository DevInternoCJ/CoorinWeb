using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.History;

public partial class Producto
{
    public short IdProducto { get; set; }

    public short IdCartera { get; set; }

    public string Producto1 { get; set; } = null!;

    public TimeOnly TiempoLímiteCuenta { get; set; }

    public byte IntentosNoCorresponde { get; set; }

    public byte IntentosSeguimiento { get; set; }

    public virtual ICollection<Cuenta> Cuenta { get; set; } = new List<Cuenta>();
}
