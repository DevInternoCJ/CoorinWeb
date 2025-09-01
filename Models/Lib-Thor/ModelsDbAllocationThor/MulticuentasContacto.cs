using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class MulticuentasContacto
{
    public string? Numerodecuenta { get; set; }

    public DateTime? FechaEnvio { get; set; }

    public string Contacto { get; set; } = null!;
}
