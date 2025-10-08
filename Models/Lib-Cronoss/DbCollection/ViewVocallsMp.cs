using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class ViewVocallsMp
{
    public long Phone { get; set; }

    public string UserName { get; set; } = null!;

    public string ExpectedName { get; set; } = null!;

    public string? ExpectedDob { get; set; }

    public string? DaysPastDue { get; set; }

    public string? DebtAmount { get; set; }

    public string ExpectedDate { get; set; } = null!;

    public int DiscountPercentage { get; set; }

    public string? LastDigits { get; set; }

    public string? Cta { get; set; }
}
