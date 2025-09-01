using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class IftRango
{
    public long NumeraciónInicial { get; set; }

    public long NumeraciónFinal { get; set; }

    public string Red { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public string Municipio { get; set; } = null!;

    public string Población { get; set; } = null!;

    public string Modalidad { get; set; } = null!;

    public string RazónSocial { get; set; } = null!;

    public DateTime FechaAsignación { get; set; }
}
