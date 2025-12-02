using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

public partial class Listum
{
    public int? IdListaNegra { get; set; }

    public long? Id { get; set; }

    public short IdCartera { get; set; }

    public long NúmeroTelefónico { get; set; }

    public DateOnly FechaListaNegra { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public string? IdCuenta { get; set; }

    public long? FolioRedeco { get; set; }

    public string? Solicitante { get; set; }
}
