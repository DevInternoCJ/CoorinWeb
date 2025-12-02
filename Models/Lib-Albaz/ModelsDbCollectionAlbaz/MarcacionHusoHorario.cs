using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class MarcacionHusoHorario
{
    public string Estado { get; set; } = null!;

    public string Municipio { get; set; } = null!;

    public string HusoVerano { get; set; } = null!;

    public string HusoInvierno { get; set; } = null!;

    public string Utc { get; set; } = null!;

    public string? FechaModificacion { get; set; }
}
