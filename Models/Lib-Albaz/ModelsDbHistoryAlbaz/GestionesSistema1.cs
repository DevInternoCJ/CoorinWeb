using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.History;

public partial class GestionesSistema1
{
    public string Idcuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public long? NúmeroTelefónico { get; set; }

    public short IdContacto { get; set; }

    public short? IdSituación { get; set; }

    public string Tipo { get; set; } = null!;

    public string? Recoveredcode { get; set; }

    public string? Currentagencyid { get; set; }

    public DateTime FechaEjecucion { get; set; }
}
