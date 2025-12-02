using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class VwCuentasUnifin
{
    public string? NombreCliente { get; set; }

    public string? Cuenta { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? TipoDeProducto { get; set; }

    public int? Correcto { get; set; }
}
