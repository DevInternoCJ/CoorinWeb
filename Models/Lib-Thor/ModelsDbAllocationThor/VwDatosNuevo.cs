using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class VwDatosNuevo
{
    public string IdCuenta { get; set; } = null!;

    public string? Valor { get; set; }

    public string Usuario { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public string Tipo { get; set; } = null!;

    public string? Correo { get; set; }

    public string? T1 { get; set; }

    public string? T2 { get; set; }

    public string? T3 { get; set; }

    public string? T4 { get; set; }

    public string? T5 { get; set; }

    public string? T6 { get; set; }

    public string? T7 { get; set; }

    public string? T8 { get; set; }

    public string? T9 { get; set; }

    public string? T10 { get; set; }

    public string Escenario { get; set; } = null!;

    public TimeOnly? SegundoInsert { get; set; }
}
