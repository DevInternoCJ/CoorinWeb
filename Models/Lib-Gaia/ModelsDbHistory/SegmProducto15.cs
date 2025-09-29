using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class SegmProducto15
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Enlace { get; set; }

    public string? TipoDeClientes { get; set; }

    public string? DisRazSocial { get; set; }

    public string? NoMotor { get; set; }

    public string? NoSerie { get; set; }

    public string? AutoDescripción { get; set; }

    public string? TipoFactura { get; set; }
}
