using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class VwCuentasHistórico
{
    public short IdCartera { get; set; }

    public string Cartera { get; set; } = null!;

    public string Cuenta { get; set; } = null!;

    public string Expediente { get; set; } = null!;

    public bool CuentaActiva { get; set; }

    public string? NombreDeudor { get; set; }

    public string? Rfc { get; set; }

    public string? NúmeroCliente { get; set; }

    public decimal Saldo { get; set; }

    public string? Situación { get; set; }

    public string? Nivel { get; set; }

    public DateOnly FechaCambioActivación { get; set; }

    public DateOnly? FechaÚltimaGestión { get; set; }

    public string? ÚltimaGestión { get; set; }

    public DateOnly? FechaÚltimaVisita { get; set; }

    public string? ÚltimaVisita { get; set; }

    public DateOnly? FechaÚltimaNegociación { get; set; }

    public string? ÚltimaNegociacion { get; set; }

    public DateOnly? FechaÚltimoPago { get; set; }

    public decimal? MontoÚltimoPago { get; set; }

    public string? CausaNoPago { get; set; }
}
