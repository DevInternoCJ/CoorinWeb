using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class ActlProducto28
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Prestamo { get; set; }

    public string? MAplcAct { get; set; }

    public string? CartAct { get; set; }

    public string? SdoAplcA { get; set; }

    public string? SdoVen { get; set; }

    public string? Encargado { get; set; }

    public string? Estrategia { get; set; }

    public string? Prioridad { get; set; }

    public string? SdoCorpA { get; set; }

    public string? MtoUlPg { get; set; }

    public string? FUltPago { get; set; }
}
