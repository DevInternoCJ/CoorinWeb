using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class Prueba200
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string CódigoAccion { get; set; } = null!;

    public string? CódigoResultado { get; set; }

    public string Observaciones { get; set; } = null!;

    public string? CódigoDeAgencia { get; set; }

    public string? GrupoCuenta { get; set; }

    public string? SegmentoActual { get; set; }

    public DateOnly? FechaAcordada { get; set; }

    public DateOnly? FechaFinNegociación { get; set; }

    public decimal? MontoNegociado { get; set; }

    public long? ConteoFilas { get; set; }

    public string? Lada { get; set; }

    public string? Teléfono { get; set; }
}
