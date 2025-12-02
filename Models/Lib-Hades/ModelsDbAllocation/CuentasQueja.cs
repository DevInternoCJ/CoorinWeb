using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbAllocation;

public partial class CuentasQueja
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaCuentaQueja { get; set; }

    public long? FolioRedeco { get; set; }

    public string? Solicitante { get; set; }

    public virtual CarterasBackup IdCarteraNavigation { get; set; } = null!;
}
