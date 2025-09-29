using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class AcumProducto129
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? NombreCliente { get; set; }

    public string? Serie { get; set; }

    public string? Modelo { get; set; }

    public string? AsignadoA { get; set; }

    public string? UltimaRenta { get; set; }

    public string? ValorLibroAzulCompra { get; set; }

    public string? PrecioDeVentaConIva { get; set; }
}
