using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class ScriptsBackup
{
    public short IdScript { get; set; }

    public short IdProducto { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripción { get; set; } = null!;

    public string Script { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public int IdEjecutivoInsert { get; set; }
}
