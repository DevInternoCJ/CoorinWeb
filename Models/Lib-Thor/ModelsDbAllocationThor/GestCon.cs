using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsAllocation;

public partial class GestCon
{
    public int? Conteo { get; set; }

    public string Idcuenta { get; set; } = null!;

    public long? Númerotelefónico { get; set; }

    public DateOnly FechaInsert { get; set; }

    public DateOnly? FechasSys { get; set; }

    public string Valor { get; set; } = null!;

    public string? Batchdate { get; set; }

    public string? Currentagencyid { get; set; }
}
