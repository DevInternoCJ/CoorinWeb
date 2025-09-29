using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class ActlProducto16
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? IdPersona { get; set; }

    public string? Plazo { get; set; }

    public string? RefCobro { get; set; }

    public DateOnly? Fec1ªRenta { get; set; }

    public string? Producto { get; set; }

    public decimal? Pago { get; set; }

    public string? Cxc { get; set; }

    public string? Product { get; set; }
}
