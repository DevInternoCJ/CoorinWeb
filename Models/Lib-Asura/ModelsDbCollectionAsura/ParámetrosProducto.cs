using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class ParámetrosProducto
{
    public short IdProducto { get; set; }

    public TimeOnly TiempoLímiteCuenta { get; set; }

    public byte IntentosNoCorresponde { get; set; }

    public byte IntentosSeguimiento { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
