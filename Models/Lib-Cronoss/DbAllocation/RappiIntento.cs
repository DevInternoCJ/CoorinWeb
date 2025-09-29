using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class RappiIntento
{
    public string Agencia { get; set; } = null!;

    public string? Cuenta { get; set; }

    public string? Fecha { get; set; }

    public string? Hora { get; set; }

    public string Consecutivo { get; set; } = null!;

    public string Ca { get; set; } = null!;

    public string Cr { get; set; } = null!;

    public string Gestor { get; set; } = null!;

    public string Comentario { get; set; } = null!;

    public int? Telefono { get; set; }

    public string? Telefono2 { get; set; }

    public int? Lada { get; set; }

    public string? FechaInsert { get; set; }
}
