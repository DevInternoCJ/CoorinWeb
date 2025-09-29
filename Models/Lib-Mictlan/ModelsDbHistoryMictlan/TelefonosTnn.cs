using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class TelefonosTnn
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public string CódigoAccion { get; set; } = null!;

    public string CódigoResultado { get; set; } = null!;

    public string? Observaciones { get; set; }

    public string? CódigoDeAgencia { get; set; }

    public string? GrupoCuenta { get; set; }

    public string? SegmentoActual { get; set; }

    public string FechaPromesa { get; set; } = null!;

    public string FechaPago { get; set; } = null!;

    public int MontoNegociado { get; set; }

    public int? ConteoFilas { get; set; }

    public string Lada { get; set; } = null!;

    public string Teléfono { get; set; } = null!;

    public string Tipo { get; set; } = null!;

    public string? Contactos { get; set; }

    public string? Situacion { get; set; }

    public string? Causanopago { get; set; }

    public string? Segmento { get; set; }

    public short? Idmodo { get; set; }
}
