using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.History;

public partial class SorianaRmt
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? IdProducto { get; set; }

    public int? IdEjecutivo { get; set; }

    public long? NumeroTelefonico { get; set; }

    public int? Motivo { get; set; }

    public string? TipoNegociacion { get; set; }

    public int? TotalPagos { get; set; }

    public string? Frecuencia { get; set; }

    public DateOnly? FechaPago { get; set; }

    public decimal? MontoPago { get; set; }

    public decimal? MontoNegociado { get; set; }

    public string? Resultado { get; set; }
}
