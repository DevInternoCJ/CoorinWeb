using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class ComentariosEspecial
{
    public string IdCuenta { get; set; } = null!;

    public short IdCartera { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public string Comentario { get; set; } = null!;
}
