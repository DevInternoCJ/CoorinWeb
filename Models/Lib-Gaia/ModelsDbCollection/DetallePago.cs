using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class DetallePago
{
    public int IdRegistro { get; set; }

    public int? IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? PagoFacturaDlls { get; set; }

    public string? PagoFacturaMxp { get; set; }

    public string? DocRate { get; set; }

    public DateTime FechaInsert { get; set; }
}
