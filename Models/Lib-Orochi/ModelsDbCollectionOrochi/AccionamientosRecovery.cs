using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class AccionamientosRecovery
{
    public string Idcuenta { get; set; } = null!;

    public string? Producto { get; set; }

    public string? Mora { get; set; }

    public DateOnly Fecha { get; set; }

    public string Activa { get; set; } = null!;

    public string Tipo { get; set; } = null!;

    public string? CuentaActiva { get; set; }
}
