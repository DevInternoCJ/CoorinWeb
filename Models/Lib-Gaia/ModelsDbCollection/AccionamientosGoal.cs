using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class AccionamientosGoal
{
    public long? IdRow { get; set; }

    public string Idcuenta { get; set; } = null!;

    public string? Producto { get; set; }

    public string? Mora { get; set; }

    public DateOnly FechaInsert { get; set; }

    public DateOnly? FechaUpdate { get; set; }

    public string? CuentaActiva { get; set; }

    public string? Activa { get; set; }
}
