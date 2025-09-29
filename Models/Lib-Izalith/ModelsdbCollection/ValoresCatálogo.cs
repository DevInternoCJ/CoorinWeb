using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class ValoresCatálogo
{
    public short IdValor { get; set; }

    public byte IdCatálogo { get; set; }

    public string Valor { get; set; } = null!;

    public DateOnly FechaValor { get; set; }

    public bool ValorActivo { get; set; }

    public string? Detalle { get; set; }

    public short? Orden { get; set; }

    public virtual ICollection<Accionamiento> Accionamientos { get; set; } = new List<Accionamiento>();

    public virtual ICollection<Adicionale> Adicionales { get; set; } = new List<Adicionale>();

    public virtual ICollection<Búsqueda> BúsquedaIdDatoNavigations { get; set; } = new List<Búsqueda>();

    public virtual ICollection<Búsqueda> BúsquedaIdFuenteNavigations { get; set; } = new List<Búsqueda>();

    public virtual ICollection<CargosAtm> CargosAtms { get; set; } = new List<CargosAtm>();

    public virtual ICollection<CarteoDevuelto> CarteoDevueltos { get; set; } = new List<CarteoDevuelto>();

    public virtual ICollection<CorreosCuenta> CorreosCuentaIdInformaciónNavigations { get; set; } = new List<CorreosCuenta>();

    public virtual ICollection<CorreosCuenta> CorreosCuentaIdOrigenNavigations { get; set; } = new List<CorreosCuenta>();

    public virtual ICollection<CorreosEnviado> CorreosEnviados { get; set; } = new List<CorreosEnviado>();

    public virtual ICollection<Cuenta> CuentaIdCausaNoPagoNavigations { get; set; } = new List<Cuenta>();

    public virtual ICollection<Cuenta> CuentaIdSituaciónNavigations { get; set; } = new List<Cuenta>();

    public virtual ICollection<Cuenta> CuentaIdSucursalNavigations { get; set; } = new List<Cuenta>();

    public virtual ICollection<DatosErróneo> DatosErróneos { get; set; } = new List<DatosErróneo>();

    public virtual ICollection<Domicilio> Domicilios { get; set; } = new List<Domicilio>();

    public virtual ICollection<Ejecutivo> EjecutivoIdBajaNavigations { get; set; } = new List<Ejecutivo>();

    public virtual ICollection<Ejecutivo> EjecutivoIdPuestoNavigations { get; set; } = new List<Ejecutivo>();

    public virtual ICollection<Ejecutivo> EjecutivoIdSucursalNavigations { get; set; } = new List<Ejecutivo>();

    public virtual ICollection<Ejecutivo> EjecutivoIdÁreaNavigations { get; set; } = new List<Ejecutivo>();

    public virtual ICollection<FlujoRespuesta> FlujoRespuesta { get; set; } = new List<FlujoRespuesta>();

    public virtual ICollection<GestionesChat> GestionesChatIdAcercamientoNavigations { get; set; } = new List<GestionesChat>();

    public virtual ICollection<GestionesChat> GestionesChatIdCausaNoPagoNavigations { get; set; } = new List<GestionesChat>();

    public virtual ICollection<GestionesChat> GestionesChatIdContactoNavigations { get; set; } = new List<GestionesChat>();

    public virtual ICollection<GestionesChat> GestionesChatIdEtapaNavigations { get; set; } = new List<GestionesChat>();

    public virtual ICollection<GestionesChat> GestionesChatIdParentescoNavigations { get; set; } = new List<GestionesChat>();

    public virtual ICollection<GestionesChat> GestionesChatIdSituaciónNavigations { get; set; } = new List<GestionesChat>();

    public virtual ICollection<GestionesChat> GestionesChatIdSucursalNavigations { get; set; } = new List<GestionesChat>();

    public virtual ICollection<GestionesDomiciliaria> GestionesDomiciliariaIdCausaNoPagoNavigations { get; set; } = new List<GestionesDomiciliaria>();

    public virtual ICollection<GestionesDomiciliaria> GestionesDomiciliariaIdContactoNavigations { get; set; } = new List<GestionesDomiciliaria>();

    public virtual ICollection<GestionesDomiciliaria> GestionesDomiciliariaIdEconómicoNavigations { get; set; } = new List<GestionesDomiciliaria>();

    public virtual ICollection<GestionesDomiciliaria> GestionesDomiciliariaIdHabitaciónNavigations { get; set; } = new List<GestionesDomiciliaria>();

    public virtual ICollection<GestionesDomiciliaria> GestionesDomiciliariaIdParentescoNavigations { get; set; } = new List<GestionesDomiciliaria>();

    public virtual ICollection<GestionesDomiciliaria> GestionesDomiciliariaIdSituaciónNavigations { get; set; } = new List<GestionesDomiciliaria>();

    public virtual ICollection<GestionesDomiciliaria> GestionesDomiciliariaIdSucursalNavigations { get; set; } = new List<GestionesDomiciliaria>();

    public virtual ICollection<GestionesDomiciliaria> GestionesDomiciliariaIdViviendaNavigations { get; set; } = new List<GestionesDomiciliaria>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdAcercamientoNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdCausaNoPagoNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdContactoNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdModoNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdParentescoNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdSituaciónNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdSucursalNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual Catálogo IdCatálogoNavigation { get; set; } = null!;

    public virtual ICollection<Meta> Meta { get; set; } = new List<Meta>();

    public virtual ICollection<Negociacione> Negociaciones { get; set; } = new List<Negociacione>();

    public virtual ICollection<Ofrecimiento> Ofrecimientos { get; set; } = new List<Ofrecimiento>();

    public virtual ICollection<PagosReportado> PagosReportados { get; set; } = new List<PagosReportado>();

    public virtual ICollection<Paquete> Paquetes { get; set; } = new List<Paquete>();

    public virtual ICollection<Pausa> Pausas { get; set; } = new List<Pausa>();

    public virtual ICollection<Queja> QuejaIdInstituciónNavigations { get; set; } = new List<Queja>();

    public virtual ICollection<Queja> QuejaIdQuejaNavigations { get; set; } = new List<Queja>();

    public virtual ICollection<RelacionesCatálogo> RelacionesCatálogoIdValor1Navigations { get; set; } = new List<RelacionesCatálogo>();

    public virtual ICollection<RelacionesCatálogo> RelacionesCatálogoIdValor2Navigations { get; set; } = new List<RelacionesCatálogo>();

    public virtual ICollection<Seguimiento> Seguimientos { get; set; } = new List<Seguimiento>();
}
