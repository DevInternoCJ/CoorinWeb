using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class DatosCreditoReestructura
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? IdEjecutvio { get; set; }

    public string? NoTdcAdicionales { get; set; }

    public int? NoPv { get; set; }

    public DateOnly? FechaApertura { get; set; }

    public int? Antiguedad { get; set; }

    public decimal? TotalAdeudo { get; set; }

    public decimal? MensualidadActual { get; set; }

    public DateOnly? SaldosAl { get; set; }

    public decimal? PagoAlFrente { get; set; }

    public decimal? TotalAreestructurar { get; set; }

    public decimal? PagoAlFrenteReal { get; set; }

    public decimal? TotalAreestructurarFinal { get; set; }

    public int? DiaDePago { get; set; }

    public int? TasaOriginal { get; set; }
}
