using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class FrasesMotivacion
{
    public int IdRegistro { get; set; }

    public int? IdEjecutivo { get; set; }

    public int? IdCartera { get; set; }

    public bool? FraseActiva { get; set; }

    public short? IdProducto { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public string? Texto { get; set; }
}
