using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class IntentosViciDialDium
{
    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public string? NúmeroTelefónico { get; set; }

    public string? StatusViciDial { get; set; }

    public string? Campaña { get; set; }

    public int DuraciónSegundos { get; set; }

    public string? TermReason { get; set; }

    public string? AltDial { get; set; }
}
