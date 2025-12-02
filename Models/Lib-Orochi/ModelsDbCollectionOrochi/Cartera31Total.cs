using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class Cartera31Total
{
    public string Idcuenta { get; set; } = null!;

    public string? Segmento { get; set; }

    public string? Producto { get; set; }

    public short IdSituacion { get; set; }

    public short IdCartera { get; set; }

    public bool CuentaActiva { get; set; }

    public long? Id { get; set; }
}
