using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class Negociacion
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdHerramienta { get; set; }

    public int IdEjecutivo { get; set; }

    public bool Reestructura { get; set; }

    public bool Condonacion { get; set; }
}
