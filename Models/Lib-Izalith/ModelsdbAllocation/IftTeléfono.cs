using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbAllocation;

public partial class IftTeléfono
{
    public long NúmeroTelefónico { get; set; }

    public string Modalidad { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public string Municipio { get; set; } = null!;
}
