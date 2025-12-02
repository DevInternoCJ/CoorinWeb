using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.History;

public partial class SegmProducto4
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Prestamo { get; set; }

    public string? CartIni { get; set; }

    public string? Producto { get; set; }

    public string? Ciclo { get; set; }

    public string? Plaza { get; set; }

    public string? Region { get; set; }

    public string? Division { get; set; }

    public string? Zona { get; set; }

    public string? Marca { get; set; }

    public string? Modelo { get; set; }

    public string? Marca2 { get; set; }

    public string? PzoCred { get; set; }

    public string? ImpOrig { get; set; }

    public string? TipSeguro { get; set; }

    public string? FechaVen { get; set; }

    public string? CtaCheque { get; set; }

    public string? EsAuto { get; set; }

    public string? TipoPers { get; set; }
}
