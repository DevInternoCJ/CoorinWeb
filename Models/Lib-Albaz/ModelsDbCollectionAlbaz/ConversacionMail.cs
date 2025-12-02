using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class ConversacionMail
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public int? IdEjecutivoInsert { get; set; }

    public DateOnly? FechaAcciona { get; set; }

    public TimeOnly HoraAcciona { get; set; }

    public string TipoEmail { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Modo { get; set; } = null!;

    public DateOnly FechaRespuesta { get; set; }

    public TimeOnly HoraRespuesta { get; set; }

    public string Comentario { get; set; } = null!;

    public int? Resultado { get; set; }
}
