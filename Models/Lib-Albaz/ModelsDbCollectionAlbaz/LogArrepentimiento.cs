using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class LogArrepentimiento
{
    public int IdLogArrepentiemiento { get; set; }

    public DateTime FechaHoraInsert { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public int IdEjecutivo { get; set; }

    public string Concepto { get; set; } = null!;

    public string Dato { get; set; } = null!;
}
