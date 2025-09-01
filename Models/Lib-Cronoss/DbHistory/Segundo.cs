using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class Segundo
{
    public TimeOnly Segundo1 { get; set; }

    public short? Minuto { get; set; }

    public byte Turno { get; set; }

    public byte Hora { get; set; }
}
