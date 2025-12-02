using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class Script
{
    public short IdScript { get; set; }

    public short IdProducto { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripción { get; set; } = null!;

    public string Script1 { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
