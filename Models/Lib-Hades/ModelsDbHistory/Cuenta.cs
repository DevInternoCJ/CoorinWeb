using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class Cuenta
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public short IdProducto { get; set; }

    public bool CuentaActiva { get; set; }

    public int Expediente { get; set; }

    public short IdSituación { get; set; }

    public string NombreDeudor { get; set; } = null!;

    public string? Rfc { get; set; }

    public string? NúmeroCliente { get; set; }

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

    public bool? Bloqueo { get; set; }

    public virtual ValoresCatálogo? IdCausaNoPagoNavigation { get; set; }

    public virtual Ejecutivo? IdEjecutivoÚltimaGestiónNavigation { get; set; }

    public virtual Ejecutivo? IdEjecutivoÚltimaNegociaciónNavigation { get; set; }

    public virtual Ejecutivo? IdEjecutivoÚltimaVisitaNavigation { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdSituaciónNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdSucursalNavigation { get; set; } = null!;
}
