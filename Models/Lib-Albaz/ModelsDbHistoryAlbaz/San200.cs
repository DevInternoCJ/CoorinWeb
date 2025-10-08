using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.History;

public partial class San200
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string CódigoAccion { get; set; } = null!;

    public string? CódigoResultado { get; set; }

    public string? Observaciones { get; set; }

    public string? CódigoDeAgencia { get; set; }

    public string? GrupoCuenta { get; set; }

    public string? SegmentoActual { get; set; }

    public DateOnly? FechaPromesa { get; set; }

    public DateOnly? FechaPago { get; set; }

    public decimal? MontoNegociado { get; set; }

    public long? ConteoFilas { get; set; }

    public string? Lada { get; set; }

    public string? Teléfono { get; set; }

    public long? Incorrectos { get; set; }

    public string Tipo { get; set; } = null!;

    public string? Contactos { get; set; }

    public string? Situacion { get; set; }

    public string? Causanopago { get; set; }
}
