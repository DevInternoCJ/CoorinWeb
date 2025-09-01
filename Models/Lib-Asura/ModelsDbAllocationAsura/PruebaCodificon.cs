using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationAsura;

public partial class PruebaCodificon
{
    public string? Idcuenta { get; set; }

    public string? Codificación { get; set; }

    public string? Nomenclatura { get; set; }

    public string? TreatmentProgram { get; set; }

    public DateOnly? TreatmentOffer { get; set; }

    public DateOnly? TreatmentAccept { get; set; }

    public DateOnly? TreatmentCompletion { get; set; }
}
