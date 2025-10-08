using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

public partial class IftTeléfono
{
    public long NúmeroTelefónico { get; set; }

    public string Modalidad { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public string Municipio { get; set; } = null!;

    public DateOnly? FechaInsert { get; set; }
}
