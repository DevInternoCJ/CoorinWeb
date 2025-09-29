using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbAllocation;

public partial class HsbcCifrasControlAsigTot
{
    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public string TipoCartera { get; set; } = null!;

    public string Tipo { get; set; } = null!;

    public int? Créditos { get; set; }

    public decimal SaldoAlDía { get; set; }

    public decimal PagoMinimoTdc { get; set; }

    public decimal SaldoContableMonedaOrigen { get; set; }

    public decimal SaldoVigenteKrn { get; set; }

    public decimal TotalAdeudoKrn { get; set; }

    public decimal SaldoAlCorteTdc { get; set; }

    public decimal SaldoVencidoTdc { get; set; }

    public decimal SaldoVencidoKrnSaldoVigenteTdc { get; set; }

    public decimal MontoPrincipalKrn { get; set; }

    public decimal InteresOrdinarioKrn { get; set; }

    public decimal MoratoriosKrn { get; set; }

    public decimal OtrosExigiblesKrn { get; set; }
}
