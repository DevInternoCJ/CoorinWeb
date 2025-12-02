using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class LogIntentosNctelefono
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public long? NúmeroTelefónico { get; set; }

    public short IdContacto { get; set; }

    public short? IdSituacion { get; set; }

    public int? IdModo { get; set; }

    public short Intento { get; set; }
}
