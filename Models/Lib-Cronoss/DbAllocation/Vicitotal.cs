using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class Vicitotal
{
    public int? Conteo { get; set; }

    public DateOnly? Fecha { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Tipo { get; set; }

    public string? CampaignId { get; set; }

    public string Servidor { get; set; } = null!;
}
