using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class VwCuentaActiva
{
    public string IdCuenta { get; set; } = null!;

    public short IdCartera { get; set; }

    public short IdProducto { get; set; }

    public short IdSituación { get; set; }

    public string NombreDeudor { get; set; } = null!;

    public string? Rfc { get; set; }

    public string? NúmeroCliente { get; set; }

    public decimal Saldo { get; set; }

    public int Expediente { get; set; }

    public DateOnly Activación { get; set; }

    public short? IdSituaciónDesactivación { get; set; }

    public short IdSucursal { get; set; }

    public short? IdCausaNoPago { get; set; }

    public bool? Bloqueo { get; set; }
}
