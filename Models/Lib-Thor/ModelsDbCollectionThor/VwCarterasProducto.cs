using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class VwCarterasProducto
{
    public short IdProducto { get; set; }

    public short IdCartera { get; set; }

    public string Producto { get; set; } = null!;

    public TimeOnly TiempoLímiteCuenta { get; set; }

    public byte IntentosNoCorresponde { get; set; }

    public byte IntentosSeguimiento { get; set; }

    public bool UsaPredictivo { get; set; }

    public string Cartera { get; set; } = null!;

    public string? Abreviación { get; set; }
}
