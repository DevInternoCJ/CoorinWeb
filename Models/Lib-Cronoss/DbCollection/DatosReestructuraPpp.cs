using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class DatosReestructuraPpp
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? IdEjecutivo { get; set; }

    public decimal? SaldoAparcializar { get; set; }

    public int? Plazo { get; set; }

    public decimal? TasaAnual { get; set; }

    public decimal? PagoMensual { get; set; }

    public decimal? TotalIntereses { get; set; }

    public decimal? Cat { get; set; }

    public string? Tabla { get; set; }
}
