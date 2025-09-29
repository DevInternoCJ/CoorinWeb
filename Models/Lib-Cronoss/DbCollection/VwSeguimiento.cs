using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class VwSeguimiento
{
    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string Cartera { get; set; } = null!;

    public string Cuenta { get; set; } = null!;

    public string EjecutivoCreó { get; set; } = null!;

    public DateOnly FechaSeguimiento { get; set; }

    public TimeOnly SegundoSeguimiento { get; set; }

    public string Acercamiento { get; set; } = null!;

    public long? NúmeroTelefónico { get; set; }

    public bool Recordatorio { get; set; }

    public bool Realizado { get; set; }

    public string? EjecutivoRealizado { get; set; }
}
