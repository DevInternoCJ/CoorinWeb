using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class TblCuenta
{
    public byte[]? IdCartera { get; set; }

    public byte[]? IdProducto { get; set; }

    public bool CuentaActiva { get; set; }

    public int Expediente { get; set; }

    public short IdSituación { get; set; }

    public byte[]? NombreDeudor { get; set; }

    public byte[]? Rfc { get; set; }

    public byte[]? NumeroCliente { get; set; }

    public decimal Saldo { get; set; }

    public DateOnly FechaCambioActivación { get; set; }

    public short? IdSituaciónDesactivación { get; set; }

    public DateOnly? FechaUpdate { get; set; }

    public short IdSucursal { get; set; }

    public DateOnly? FechaÚltimaGestión { get; set; }

    public int? IdEjecutivoÚltimaGestión { get; set; }

    public DateOnly? FechaÚltimaVisita { get; set; }

    public int? IdEjecutivoÚltimaVisita { get; set; }

    public DateOnly? FechaÚltimaNegociación { get; set; }

    public int? IdEjecutivoÚltimaNegociación { get; set; }

    public DateOnly? FechaÚltimoPago { get; set; }

    public DateOnly? FechaPróximoSeguimiento { get; set; }

    public short? IdCausaNoPago { get; set; }

    public decimal? MontoÚltimoPago { get; set; }

    public short? PagosVencidos { get; set; }

    public bool Bloqueo { get; set; }
}
