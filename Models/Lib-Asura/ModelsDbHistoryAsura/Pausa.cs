using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class Pausa
{
    public int IdEjecutivo { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public short IdPausa { get; set; }

    public TimeOnly Duración { get; set; }

    public virtual ValoresCatálogo IdPausaNavigation { get; set; } = null!;
}
