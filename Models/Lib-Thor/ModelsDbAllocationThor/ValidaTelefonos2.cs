using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsAllocation;

public partial class ValidaTelefonos2
{
    public string Idcuenta { get; set; } = null!;

    public string? Númerocliente { get; set; }

    public string? Buc { get; set; }

    public string? Teléfono { get; set; }

    public short Idorigen { get; set; }

    public string Origen { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }
}
