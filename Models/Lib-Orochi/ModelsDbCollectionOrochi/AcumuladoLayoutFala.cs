using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class AcumuladoLayoutFala
{
    public string? Idcuenta { get; set; }

    public DateOnly? FechaGestion { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? HoraInsert { get; set; }
}
