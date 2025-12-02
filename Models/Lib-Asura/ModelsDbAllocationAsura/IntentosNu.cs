using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class IntentosNu
{
    public string? Uniqueid { get; set; }

    public string? LeadId { get; set; }

    public string? ListId { get; set; }

    public string? CampaignId { get; set; }

    public DateOnly? CallDate { get; set; }

    public string? SegundoInsert { get; set; }

    public string? StartEpoch { get; set; }

    public string? EndEpoch { get; set; }

    public string? LengthInSec { get; set; }

    public string? Status { get; set; }

    public string? PhoneCode { get; set; }

    public string? PhoneNumber { get; set; }

    public string? User { get; set; }

    public string? Comments { get; set; }

    public string? Processed { get; set; }

    public string? UserGroup { get; set; }

    public string? TermReason { get; set; }

    public string? AltDial { get; set; }

    public string? CalledCount { get; set; }
}
