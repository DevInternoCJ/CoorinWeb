using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class EjecutivosToken
{
    public string Usuario { get; set; } = null!;

    public string? Token { get; set; }

    public DateTime? UltimaConsulta { get; set; }
}
