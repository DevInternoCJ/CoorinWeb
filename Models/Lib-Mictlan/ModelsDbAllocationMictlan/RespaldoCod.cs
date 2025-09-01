using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

public partial class RespaldoCod
{
    public long IdCodificación { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string Entity { get; set; } = null!;

    public string? TreatmentProgram { get; set; }

    public string FieldName { get; set; } = null!;

    public string? TreatmentValue { get; set; }

    public string? Codificacion { get; set; }

    public string? CurrentAgencyId { get; set; }

    public string? LoanProductcode { get; set; }

    public DateOnly Proceso { get; set; }

    public DateOnly? Validado { get; set; }

    public DateOnly? Enviado { get; set; }

    public byte Etapa { get; set; }

    public string? Desarrollo { get; set; }

    public string? Hash { get; set; }
}
