using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Allocation;

public partial class Ofrecimiento
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public short IdHerramienta { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public short IdAcercamiento { get; set; }

    public decimal MontoRequerido { get; set; }

    public decimal MontoOfrecido { get; set; }

    public float Descuento { get; set; }

    public byte Plazos { get; set; }

    public decimal Saldo { get; set; }

    public DateOnly? FechaCorte { get; set; }
}
