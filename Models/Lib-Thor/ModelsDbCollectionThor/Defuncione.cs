using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class Defuncione
{
    public int IdCartera { get; set; }

    public int IdEjecutivo { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string? NombreResponsable { get; set; }

    public TimeOnly? HoraLocalizacion { get; set; }
}
