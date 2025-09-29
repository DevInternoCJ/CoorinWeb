using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class Vicivacio
{
    public int? Conteo { get; set; }

    public DateOnly? Fecha { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Tipo { get; set; }

    public string? Status { get; set; }
}
