using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class ValoresCatálogo
{
    public short IdValor { get; set; }

    public byte IdCatálogo { get; set; }

    public string Valor { get; set; } = null!;

    public DateOnly FechaValor { get; set; }

    public bool ValorActivo { get; set; }

    public string? Detalle { get; set; }

    public short? Orden { get; set; }

    public virtual ICollection<Adicionale> Adicionales { get; set; } = new List<Adicionale>();

    public virtual ICollection<Búsqueda> BúsquedaIdDatoNavigations { get; set; } = new List<Búsqueda>();

    public virtual ICollection<Búsqueda> BúsquedaIdFuenteNavigations { get; set; } = new List<Búsqueda>();

    public virtual ICollection<CargosAtm> CargosAtms { get; set; } = new List<CargosAtm>();

    public virtual ICollection<CarteoDevuelto> CarteoDevueltos { get; set; } = new List<CarteoDevuelto>();

    public virtual ICollection<CorreosCuenta> CorreosCuentaIdInformaciónNavigations { get; set; } = new List<CorreosCuenta>();

    public virtual ICollection<CorreosCuenta> CorreosCuentaIdOrigenNavigations { get; set; } = new List<CorreosCuenta>();

    public virtual ICollection<CorreosCuentasBackup> CorreosCuentasBackupIdInformaciónNavigations { get; set; } = new List<CorreosCuentasBackup>();

    public virtual ICollection<CorreosCuentasBackup> CorreosCuentasBackupIdOrigenNavigations { get; set; } = new List<CorreosCuentasBackup>();

    public virtual ICollection<Cuenta> CuentaIdCausaNoPagoNavigations { get; set; } = new List<Cuenta>();

    public virtual ICollection<Cuenta> CuentaIdSituaciónNavigations { get; set; } = new List<Cuenta>();

    public virtual ICollection<Cuenta> CuentaIdSucursalNavigations { get; set; } = new List<Cuenta>();

    public virtual ICollection<CuentasBackup> CuentasBackupIdCausaNoPagoNavigations { get; set; } = new List<CuentasBackup>();

    public virtual ICollection<CuentasBackup> CuentasBackupIdSituaciónNavigations { get; set; } = new List<CuentasBackup>();

    public virtual ICollection<CuentasBackup> CuentasBackupIdSucursalNavigations { get; set; } = new List<CuentasBackup>();

    public virtual ICollection<DatosErróneo> DatosErróneos { get; set; } = new List<DatosErróneo>();

    public virtual ICollection<DatosErróneosback> DatosErróneosbacks { get; set; } = new List<DatosErróneosback>();

    public virtual ICollection<Domicilio> Domicilios { get; set; } = new List<Domicilio>();

    public virtual ICollection<DomiciliosBackup> DomiciliosBackups { get; set; } = new List<DomiciliosBackup>();

    public virtual ICollection<Ejecutivo> EjecutivoIdBajaNavigations { get; set; } = new List<Ejecutivo>();

    public virtual ICollection<Ejecutivo> EjecutivoIdPuestoNavigations { get; set; } = new List<Ejecutivo>();

    public virtual ICollection<Ejecutivo> EjecutivoIdSucursalNavigations { get; set; } = new List<Ejecutivo>();

    public virtual ICollection<Ejecutivo> EjecutivoIdÁreaNavigations { get; set; } = new List<Ejecutivo>();

    public virtual ICollection<FlujoRespuesta> FlujoRespuesta { get; set; } = new List<FlujoRespuesta>();

    public virtual ICollection<GestionesChatBackup> GestionesChatBackupIdAcercamientoNavigations { get; set; } = new List<GestionesChatBackup>();

    public virtual ICollection<GestionesChatBackup> GestionesChatBackupIdCausaNoPagoNavigations { get; set; } = new List<GestionesChatBackup>();

    public virtual ICollection<GestionesChatBackup> GestionesChatBackupIdContactoNavigations { get; set; } = new List<GestionesChatBackup>();

    public virtual ICollection<GestionesChatBackup> GestionesChatBackupIdEtapaNavigations { get; set; } = new List<GestionesChatBackup>();

    public virtual ICollection<GestionesChatBackup> GestionesChatBackupIdParentescoNavigations { get; set; } = new List<GestionesChatBackup>();

    public virtual ICollection<GestionesChatBackup> GestionesChatBackupIdSituaciónNavigations { get; set; } = new List<GestionesChatBackup>();

    public virtual ICollection<GestionesChatBackup> GestionesChatBackupIdSucursalNavigations { get; set; } = new List<GestionesChatBackup>();

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

    public virtual ICollection<GestionesDomiciliariasBackup> GestionesDomiciliariasBackupIdCausaNoPagoNavigations { get; set; } = new List<GestionesDomiciliariasBackup>();

    public virtual ICollection<GestionesDomiciliariasBackup> GestionesDomiciliariasBackupIdContactoNavigations { get; set; } = new List<GestionesDomiciliariasBackup>();

    public virtual ICollection<GestionesDomiciliariasBackup> GestionesDomiciliariasBackupIdEconómicoNavigations { get; set; } = new List<GestionesDomiciliariasBackup>();

    public virtual ICollection<GestionesDomiciliariasBackup> GestionesDomiciliariasBackupIdHabitaciónNavigations { get; set; } = new List<GestionesDomiciliariasBackup>();

    public virtual ICollection<GestionesDomiciliariasBackup> GestionesDomiciliariasBackupIdParentescoNavigations { get; set; } = new List<GestionesDomiciliariasBackup>();

    public virtual ICollection<GestionesDomiciliariasBackup> GestionesDomiciliariasBackupIdSituaciónNavigations { get; set; } = new List<GestionesDomiciliariasBackup>();

    public virtual ICollection<GestionesDomiciliariasBackup> GestionesDomiciliariasBackupIdSucursalNavigations { get; set; } = new List<GestionesDomiciliariasBackup>();

    public virtual ICollection<GestionesDomiciliariasBackup> GestionesDomiciliariasBackupIdViviendaNavigations { get; set; } = new List<GestionesDomiciliariasBackup>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdAcercamientoNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdCausaNoPagoNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdContactoNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdModoNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdParentescoNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdSituaciónNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdSucursalNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónicasBackup> GestionesTelefónicasBackupIdAcercamientoNavigations { get; set; } = new List<GestionesTelefónicasBackup>();

    public virtual ICollection<GestionesTelefónicasBackup> GestionesTelefónicasBackupIdCausaNoPagoNavigations { get; set; } = new List<GestionesTelefónicasBackup>();

    public virtual ICollection<GestionesTelefónicasBackup> GestionesTelefónicasBackupIdContactoNavigations { get; set; } = new List<GestionesTelefónicasBackup>();

    public virtual ICollection<GestionesTelefónicasBackup> GestionesTelefónicasBackupIdModoNavigations { get; set; } = new List<GestionesTelefónicasBackup>();

    public virtual ICollection<GestionesTelefónicasBackup> GestionesTelefónicasBackupIdParentescoNavigations { get; set; } = new List<GestionesTelefónicasBackup>();

    public virtual ICollection<GestionesTelefónicasBackup> GestionesTelefónicasBackupIdSituaciónNavigations { get; set; } = new List<GestionesTelefónicasBackup>();

    public virtual ICollection<GestionesTelefónicasBackup> GestionesTelefónicasBackupIdSucursalNavigations { get; set; } = new List<GestionesTelefónicasBackup>();

    public virtual Catálogo IdCatálogoNavigation { get; set; } = null!;

    public virtual ICollection<Meta> Meta { get; set; } = new List<Meta>();

    public virtual ICollection<Negociacione> Negociaciones { get; set; } = new List<Negociacione>();

    public virtual ICollection<NegociacionesBackup> NegociacionesBackups { get; set; } = new List<NegociacionesBackup>();

    public virtual ICollection<Ofrecimiento> Ofrecimientos { get; set; } = new List<Ofrecimiento>();

    public virtual ICollection<OfrecimientosBackup> OfrecimientosBackups { get; set; } = new List<OfrecimientosBackup>();

    public virtual ICollection<PagosReportado> PagosReportados { get; set; } = new List<PagosReportado>();

    public virtual ICollection<PagosReportadosBackup> PagosReportadosBackups { get; set; } = new List<PagosReportadosBackup>();

    public virtual ICollection<PagosReportadosResp> PagosReportadosResps { get; set; } = new List<PagosReportadosResp>();

    public virtual ICollection<Paquete> Paquetes { get; set; } = new List<Paquete>();

    public virtual ICollection<Pausa> Pausas { get; set; } = new List<Pausa>();

    public virtual ICollection<Queja> QuejaIdInstituciónNavigations { get; set; } = new List<Queja>();

    public virtual ICollection<Queja> QuejaIdQuejaNavigations { get; set; } = new List<Queja>();

    public virtual ICollection<QuejasBackup> QuejasBackupIdInstituciónNavigations { get; set; } = new List<QuejasBackup>();

    public virtual ICollection<QuejasBackup> QuejasBackupIdQuejaNavigations { get; set; } = new List<QuejasBackup>();

    public virtual ICollection<RelacionesCatálogo> RelacionesCatálogoIdValor1Navigations { get; set; } = new List<RelacionesCatálogo>();

    public virtual ICollection<RelacionesCatálogo> RelacionesCatálogoIdValor2Navigations { get; set; } = new List<RelacionesCatálogo>();

    public virtual ICollection<Seguimiento> Seguimientos { get; set; } = new List<Seguimiento>();

    public virtual ICollection<SeguimientosBackup> SeguimientosBackups { get; set; } = new List<SeguimientosBackup>();

    public virtual ICollection<Teléfono> TeléfonoIdClaseNavigations { get; set; } = new List<Teléfono>();

    public virtual ICollection<Teléfono> TeléfonoIdOrigenNavigations { get; set; } = new List<Teléfono>();

    public virtual ICollection<Teléfono> TeléfonoIdTelefoníaNavigations { get; set; } = new List<Teléfono>();

    public virtual ICollection<TeléfonosBackup> TeléfonosBackupIdClaseNavigations { get; set; } = new List<TeléfonosBackup>();

    public virtual ICollection<TeléfonosBackup> TeléfonosBackupIdOrigenNavigations { get; set; } = new List<TeléfonosBackup>();

    public virtual ICollection<TeléfonosBackup> TeléfonosBackupIdTelefoníaNavigations { get; set; } = new List<TeléfonosBackup>();
}
