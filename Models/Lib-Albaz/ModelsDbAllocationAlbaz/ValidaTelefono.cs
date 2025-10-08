using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Allocation;

public partial class ValidaTelefono
{
    public string Idcuenta { get; set; } = null!;

    public string? Númerocliente { get; set; }

    public string? Teléfono { get; set; }

    public short Idorigen { get; set; }

    public string Origen { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }
}
