using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class QueueViciNu
{
    public string? UniqueId { get; set; }

    public string? LeadId { get; set; }

    public string? CustomerId { get; set; }

    public string? CampaignId { get; set; }

    public DateTime? CallDate { get; set; }

    public string? HttpStatusCode { get; set; }

    public string? PhoneNumber { get; set; }

    public string? User { get; set; }

    public string? AdvisorName { get; set; }

    public string? Email { get; set; }

    public string? AgentType { get; set; }

    public string? Comments { get; set; }

    public string? Status { get; set; }
}
