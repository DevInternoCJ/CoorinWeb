using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class QueueViciNu
{
    public int IdRegistro { get; set; }

    public string Uniqueid { get; set; } = null!;

    public long LeadId { get; set; }

    public string CustomerId { get; set; } = null!;

    public string? CampaignId { get; set; }

    public DateTime CallDate { get; set; }

    public string Status { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string? User { get; set; }

    public string? AdvisorName { get; set; }

    public string? Email { get; set; }

    public string? AgentType { get; set; }

    public string? Comments { get; set; }

    public int? HttpStatusCode { get; set; }
}
