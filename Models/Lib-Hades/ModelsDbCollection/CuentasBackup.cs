using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class CuentasBackup
{
    public short IdCartera { get; set; }

    /// <summary>
    /// El número de cuenta con el cual se relacionará con la tabla de asignación.
    /// </summary>
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

    public virtual ICollection<Adicionale> Adicionales { get; set; } = new List<Adicionale>();

    public virtual ICollection<Auto> Autos { get; set; } = new List<Auto>();

    public virtual ICollection<Búsqueda> Búsqueda { get; set; } = new List<Búsqueda>();

    public virtual ICollection<ComentariosBackup> ComentariosBackups { get; set; } = new List<ComentariosBackup>();

    public virtual ICollection<CorreosCuentasBackup> CorreosCuentasBackups { get; set; } = new List<CorreosCuentasBackup>();

    public virtual ICollection<DomiciliosBackup> DomiciliosBackups { get; set; } = new List<DomiciliosBackup>();

    public virtual ICollection<GestionesChatBackup> GestionesChatBackups { get; set; } = new List<GestionesChatBackup>();

    public virtual ICollection<GestionesDomiciliariasBackup> GestionesDomiciliariasBackups { get; set; } = new List<GestionesDomiciliariasBackup>();

    public virtual ICollection<GestionesTelefónicasBackup> GestionesTelefónicasBackups { get; set; } = new List<GestionesTelefónicasBackup>();

    public virtual ValoresCatálogo? IdCausaNoPagoNavigation { get; set; }

    public virtual Ejecutivo? IdEjecutivoÚltimaGestiónNavigation { get; set; }

    public virtual Ejecutivo? IdEjecutivoÚltimaNegociaciónNavigation { get; set; }

    public virtual Ejecutivo? IdEjecutivoÚltimaVisitaNavigation { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdSituaciónNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdSucursalNavigation { get; set; } = null!;

    public virtual NegociacionesBackup? NegociacionesBackup { get; set; }

    public virtual ICollection<NombresBackup> NombresBackups { get; set; } = new List<NombresBackup>();

    public virtual ICollection<PagosBackup> PagosBackups { get; set; } = new List<PagosBackup>();

    public virtual ICollection<PagosReportadosResp> PagosReportadosResps { get; set; } = new List<PagosReportadosResp>();

    public virtual ICollection<Plazo> Plazos { get; set; } = new List<Plazo>();

    public virtual ICollection<QuejasBackup> QuejasBackups { get; set; } = new List<QuejasBackup>();

    public virtual ICollection<Revisione> Revisiones { get; set; } = new List<Revisione>();

    public virtual ICollection<SeguimientosBackup> SeguimientosBackups { get; set; } = new List<SeguimientosBackup>();

    public virtual ICollection<SolicitudesEstadosDeCuentum> SolicitudesEstadosDeCuenta { get; set; } = new List<SolicitudesEstadosDeCuentum>();

    public virtual ICollection<TeléfonosBackup> TeléfonosBackups { get; set; } = new List<TeléfonosBackup>();
}
