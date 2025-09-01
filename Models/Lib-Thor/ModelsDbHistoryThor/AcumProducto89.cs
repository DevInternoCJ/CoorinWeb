using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class AcumProducto89
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string? Id { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? Nombre { get; set; }

    public string? Calle { get; set; }

    public string? Colonia { get; set; }

    public string? Municipio { get; set; }

    public string? Estado { get; set; }

    public string? Cp { get; set; }

    public string? Rfc { get; set; }

    public string? Tel1 { get; set; }

    public string? Tel2 { get; set; }

    public string? Tel3 { get; set; }

    public string? Status { get; set; }

    public string? SubEstatus { get; set; }

    public string? Observaciones { get; set; }

    public string? Adeudo { get; set; }

    public string? Descuento { get; set; }

    public string? MontoALiquidar { get; set; }

    public string? FechaPago { get; set; }

    public string? MontoNegociado { get; set; }

    public string? MontoPago { get; set; }

    public string? FechaDeGestion { get; set; }
}
