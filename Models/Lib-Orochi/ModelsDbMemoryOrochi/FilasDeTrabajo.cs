using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Memory;

public partial class FilasDeTrabajo
{
    public int IdFilaDeTrabajo { get; set; }

    public int IdCampaña { get; set; }

    public int IdEjecutivo { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public long? NúmeroTelefónico { get; set; }
}
