using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class Cuenta
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

    public virtual ICollection<Accionamiento> Accionamientos { get; set; } = new List<Accionamiento>();

    public virtual ICollection<Adicionale> Adicionales { get; set; } = new List<Adicionale>();

    public virtual ICollection<Auto> Autos { get; set; } = new List<Auto>();

    public virtual ICollection<Búsqueda> Búsqueda { get; set; } = new List<Búsqueda>();

    public virtual ICollection<CargosAtm> CargosAtms { get; set; } = new List<CargosAtm>();

    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    public virtual ICollection<CorreosCuenta> CorreosCuenta { get; set; } = new List<CorreosCuenta>();

    public virtual ICollection<CorreosEnviado> CorreosEnviados { get; set; } = new List<CorreosEnviado>();

    public virtual ICollection<Domicilio> Domicilios { get; set; } = new List<Domicilio>();

    public virtual ICollection<GestionesChat> GestionesChats { get; set; } = new List<GestionesChat>();

    public virtual ICollection<GestionesDomiciliaria> GestionesDomiciliaria { get; set; } = new List<GestionesDomiciliaria>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicas { get; set; } = new List<GestionesTelefónica>();

    public virtual ValoresCatálogo? IdCausaNoPagoNavigation { get; set; }

    public virtual Ejecutivo? IdEjecutivoÚltimaGestiónNavigation { get; set; }

    public virtual Ejecutivo? IdEjecutivoÚltimaNegociaciónNavigation { get; set; }

    public virtual Ejecutivo? IdEjecutivoÚltimaVisitaNavigation { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdSituaciónNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdSucursalNavigation { get; set; } = null!;

    public virtual Negociacione? Negociacione { get; set; }

    public virtual ICollection<Nombre> Nombres { get; set; } = new List<Nombre>();

    public virtual ICollection<Pago> Pagos { get; set; } = new List<Pago>();

    public virtual ICollection<PagosReportado> PagosReportados { get; set; } = new List<PagosReportado>();

    public virtual ICollection<Plazo> Plazos { get; set; } = new List<Plazo>();

    public virtual ICollection<Queja> Quejas { get; set; } = new List<Queja>();

    public virtual ICollection<Revisione> Revisiones { get; set; } = new List<Revisione>();

    public virtual ICollection<Seguimiento> Seguimientos { get; set; } = new List<Seguimiento>();

    public virtual ICollection<SolicitudesEstadosDeCuentum> SolicitudesEstadosDeCuenta { get; set; } = new List<SolicitudesEstadosDeCuentum>();

    public virtual ICollection<Teléfono> Teléfonos { get; set; } = new List<Teléfono>();
}
