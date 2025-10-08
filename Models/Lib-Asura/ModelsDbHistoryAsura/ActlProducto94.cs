using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class ActlProducto94
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Plaza { get; set; }

    public string? Region { get; set; }

    public string? SaldoActual { get; set; }

    public string? PctjContado { get; set; }

    public string? BonificacionContado { get; set; }

    public string? PagoContado { get; set; }

    public string? Pctj2pagos { get; set; }

    public string? Bonificacion2pagos { get; set; }

    public string? SaldoVencidoCalculo { get; set; }

    public string? Ciclo { get; set; }

    public string? BucketSim { get; set; }

    public string? FechaPrimerWr { get; set; }

    public string? FechaWrPosterior { get; set; }

    public string? NoMesWr { get; set; }

    public string? DiasWr { get; set; }

    public string? FechaAsignacion { get; set; }

    public string? RegionNueva { get; set; }
}
