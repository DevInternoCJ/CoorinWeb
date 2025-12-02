using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class IntentosViciDial
{
    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public long NúmeroTelefónico { get; set; }

    public string StatusViciDial { get; set; } = null!;

    public string Campaña { get; set; } = null!;

    public short DuraciónSegundos { get; set; }

    public string? TermReason { get; set; }

    public string? AltDial { get; set; }
}
