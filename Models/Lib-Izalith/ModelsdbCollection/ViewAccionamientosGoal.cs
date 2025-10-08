using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class ViewAccionamientosGoal
{
    public long? IdRow { get; set; }

    public string Idcuenta { get; set; } = null!;

    public string? Producto { get; set; }

    public string Bucket { get; set; } = null!;

    public string Fecha { get; set; } = null!;

    public string FechaUpdate { get; set; } = null!;

    public string Activa { get; set; } = null!;

    public string CuentaActiva { get; set; } = null!;
}
