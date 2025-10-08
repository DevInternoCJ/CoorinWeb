using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class Layout
{
    public short IdLayout { get; set; }

    public string Layout1 { get; set; } = null!;

    public short IdCartera { get; set; }

    public short IdProceso { get; set; }

    public string Campo0 { get; set; } = null!;

    public string Campo1 { get; set; } = null!;

    public string? Campo2 { get; set; }

    public string? Campo3 { get; set; }

    public string? Campo4 { get; set; }

    public string? Campo5 { get; set; }

    public string? Campo6 { get; set; }

    public string? Campo7 { get; set; }

    public string? Campo8 { get; set; }

    public string? Campo9 { get; set; }

    public string? Campo10 { get; set; }

    public string? Campo11 { get; set; }

    public string? Campo12 { get; set; }

    public string? Campo13 { get; set; }

    public string? Campo14 { get; set; }

    public string? Campo15 { get; set; }

    public DateOnly? FechaLayout { get; set; }

    public int? IdEjecutivo { get; set; }
}
