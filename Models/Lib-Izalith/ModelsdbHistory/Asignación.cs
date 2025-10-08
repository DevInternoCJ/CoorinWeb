using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class Asignación
{
    public string Préstamo { get; set; } = null!;

    public DateOnly FechaAsignación { get; set; }

    public DateOnly FechaRetiroBbva { get; set; }

    public string IdCuenta { get; set; } = null!;

    public int IdProducto { get; set; }

    public decimal Saldo { get; set; }

    public short? Mora { get; set; }
}
