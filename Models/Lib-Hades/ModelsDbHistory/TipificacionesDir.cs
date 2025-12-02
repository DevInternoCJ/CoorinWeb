using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class TipificacionesDir
{
    public DateOnly? Fecha { get; set; }

    public string? ClaveTip { get; set; }

    public string? ClaveOic { get; set; }

    public string? ResTip { get; set; }

    public string? NumeroTelefonico { get; set; }

    public string? Expediente { get; set; }
}
