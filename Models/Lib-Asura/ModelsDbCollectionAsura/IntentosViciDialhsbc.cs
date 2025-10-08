using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class IntentosViciDialhsbc
{
    public DateOnly? Fecha { get; set; }

    public TimeOnly? Hora { get; set; }

    public string? Telefono { get; set; }

    public string? Status { get; set; }

    public int Duracion { get; set; }

    public string? CampaignId { get; set; }

    public string? TermReason { get; set; }

    public string? AltDial { get; set; }
}
