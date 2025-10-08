using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class SaldosConvenio
{
    public DateOnly FechaInsert { get; set; }

    public string IdCuenta { get; set; } = null!;

    public TimeOnly SegundoInsert { get; set; }

    public string? MontoPrincipalKrn { get; set; }

    public string? InteresOrdinarioKrn { get; set; }

    public string? MoratoriosKrn { get; set; }

    public string? OtrosExigiblesKrn { get; set; }

    public string? SaldoAlDía { get; set; }

    public string? PagoMinimoTdc { get; set; }

    public string? SaldoAlCorteTdc { get; set; }

    public string? SaldoVencidoTdc { get; set; }

    public byte? PagosVencidos { get; set; }
}
