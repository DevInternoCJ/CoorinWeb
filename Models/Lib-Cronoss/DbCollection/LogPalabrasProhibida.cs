using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class LogPalabrasProhibida
{
    public int IdLogPalabraProhibida { get; set; }

    public DateTime FechaHora { get; set; }

    public int IdEjecutivo { get; set; }

    public string PalabraProhibida { get; set; } = null!;

    public string Gestión { get; set; } = null!;

    public int? IdCartera { get; set; }

    public string? IdCuenta { get; set; }
}
