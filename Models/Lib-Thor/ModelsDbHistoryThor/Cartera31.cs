using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class Cartera31
{
    public string Idcuenta { get; set; } = null!;

    public string? InformacionAl { get; set; }

    public string? SaldoDeuda { get; set; }

    public string? SaldoMora { get; set; }

    public string SaldoCapital { get; set; } = null!;

    public string? DiasMora { get; set; }

    public string? FecVctoCuota1 { get; set; }

    public string? TelParticular { get; set; }

    public string? TelefonoOficina { get; set; }

    public string? TelefonoAdicional { get; set; }

    public string? TelefonoCobranza { get; set; }

    public string? TelefonoPartRelacion1 { get; set; }

    public string? TelefonoComRelacion1 { get; set; }

    public string? TelefonoPartRelacion2 { get; set; }

    public string? TelefonoComRelacion2 { get; set; }

    public string? TelefonoPartRelacion3 { get; set; }

    public string? TelefonoComRelacion3 { get; set; }

    public string? Corte { get; set; }

    public string? SaldoAlCorte { get; set; }

    public string? Mora { get; set; }

    public string? DescuentoAplicar30Dias { get; set; }

    public string? DescuentoAplicar3Meses { get; set; }

    public string? DescuentoAplicar6Meses { get; set; }

    public string? DescuentoAplicar12Meses { get; set; }

    public string? DescuentoAplicar24Meses { get; set; }

    public string? DescuentoAplicarMayorA24YMenorA48Meses { get; set; }

    public string? Condonacion { get; set; }

    public string? Reestructura { get; set; }

    public string? Quita { get; set; }

    public string? Capital { get; set; }

    public string? Comisiones { get; set; }

    public string? Intereses { get; set; }

    public string? Impuestos { get; set; }

    public string? ComisionesMorosidad { get; set; }

    public string? InteresesMorosidad { get; set; }

    public string? ImpuestosMorosidad { get; set; }

    public string? Segmento { get; set; }

    public string Pan { get; set; } = null!;

    public string DescuentoPt { get; set; } = null!;

    public string SegmentoRem { get; set; } = null!;

    public string SaldoaNegociarPt { get; set; } = null!;

    public string SaldoaNegociarCp { get; set; } = null!;

    public string DescuentoCp { get; set; } = null!;

    public string SaldoaNegociarLp { get; set; } = null!;

    public string DescuentoLp { get; set; } = null!;

    public string? Agencia { get; set; }

    public string CondonaciónVsdeuda { get; set; } = null!;

    public string ComisionesMora { get; set; } = null!;

    public string Especial { get; set; } = null!;

    public string? ProductoCj { get; set; }

    public string CondonacionNeg { get; set; } = null!;

    public string ReestructuraNeg { get; set; } = null!;

    public string Riesgo { get; set; } = null!;

    public string HitNoHit { get; set; } = null!;

    public string SinMatch { get; set; } = null!;

    public DateOnly? FechaNeg { get; set; }

    public bool? ReestNeg { get; set; }

    public bool? CondNeg { get; set; }
}
