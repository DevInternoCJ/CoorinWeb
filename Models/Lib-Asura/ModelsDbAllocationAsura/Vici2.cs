using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class Vici2
{
    public int? Conteo { get; set; }

    public DateOnly? Fecha { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Tipo { get; set; }

    public string? CampaignId { get; set; }

    public string Servidor { get; set; } = null!;
}
