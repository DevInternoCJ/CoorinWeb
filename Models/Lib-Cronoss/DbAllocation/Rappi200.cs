using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class Rappi200
{
    public string? Grupo { get; set; }

    public short? IdClase { get; set; }

    public string? FechaGest { get; set; }

    public string? IdCuenta { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string? Comentario { get; set; }

    public string Lada { get; set; } = null!;

    public string Teléfono { get; set; } = null!;

    public short Extensión { get; set; }

    public short? IdAcercamiento { get; set; }

    public short IdContacto { get; set; }

    public short? IdSituación { get; set; }

    public short IdCartera { get; set; }

    public DateOnly FechaInsert { get; set; }

    public string? Cacr { get; set; }

    public string Tipo { get; set; } = null!;
}
