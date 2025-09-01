using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class ActlProducto51
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? MoracontI { get; set; }

    public string? SdocontI { get; set; }

    public string? MoraaplcI { get; set; }

    public string? MinimoIni { get; set; }

    public string? VencidIni { get; set; }

    public string? Plazo { get; set; }
}
