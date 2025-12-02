using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class VwNegociacionesOfrecimiento
{
    public string Cuenta { get; set; } = null!;

    public short IdCartera { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public DateTime? FechaHora { get; set; }

    public string Herramienta { get; set; } = null!;

    public string EstadoNegociación { get; set; } = null!;

    public decimal MontoNegociado { get; set; }

    public byte Plazos { get; set; }

    public int IdEjecutivo { get; set; }

    public string Negoció { get; set; } = null!;

    public string Validó { get; set; } = null!;

    public string? CorreoElectrónico { get; set; }

    public DateOnly? FechaAcordada { get; set; }

    public DateOnly FechaFinNegociación { get; set; }

    public byte Pagos { get; set; }

    public decimal MontoPagado { get; set; }

    public decimal SaldoNegociación { get; set; }

    public int? Folio { get; set; }

    public decimal MontoRequerido { get; set; }

    public decimal MontoOfrecido { get; set; }
}
