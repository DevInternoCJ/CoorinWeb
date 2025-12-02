using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class IntensidadBanorte
{
    public int IdContinuo { get; set; }

    public string Agencia { get; set; } = null!;

    public string? Cuenta { get; set; }

    public string? Fecha { get; set; }

    public string? Hora { get; set; }

    public string Consecutivo { get; set; } = null!;

    public string Ca { get; set; } = null!;

    public string? Cr { get; set; }

    public string Gestor { get; set; } = null!;

    public string? Comentario { get; set; }

    public string Telefono { get; set; } = null!;

    public string? Telefono2 { get; set; }

    public string? Lada { get; set; }

    public DateTime FechaInsert { get; set; }
}
