using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class CanalDePago
{
    public short? IdCartera { get; set; }

    public string? IdCuenta { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public int? IdHerramienta { get; set; }

    public int? IdEjecutivo { get; set; }

    public int? IdCanalDePago { get; set; }
}
