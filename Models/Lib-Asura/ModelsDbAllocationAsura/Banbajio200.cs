using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class Banbajio200
{
    public string Grupo { get; set; } = null!;

    public short? IdClase { get; set; }

    public string? FechaGest { get; set; }

    public string IdCuenta { get; set; } = null!;

    public TimeOnly SegundoGest { get; set; }

    public string? Comentario { get; set; }

    public string Lada { get; set; } = null!;

    public string Teléfono { get; set; } = null!;

    public string Extensión { get; set; } = null!;

    public short? IdAcercamiento { get; set; }

    public short IdContacto { get; set; }

    public short? IdModo { get; set; }

    public short? IdSituación { get; set; }

    public short IdCartera { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string? Credito { get; set; }

    public string? Usuario { get; set; }

    public string Tipo { get; set; } = null!;

    public string? Cacr { get; set; }

    public string? Detalle { get; set; }
}
