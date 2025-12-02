using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class AsignacionFuente
{
    public int Id { get; set; }

    public short? IdCartera { get; set; }

    public int? IdEjecutivo { get; set; }

    public string? Fuente { get; set; }

    public bool? Activo { get; set; }
}
