using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class ValoresCatálogo
{
    public short IdValor { get; set; }

    public byte IdCatálogo { get; set; }

    public string Valor { get; set; } = null!;

    public DateOnly FechaValor { get; set; }

    public bool ValorActivo { get; set; }

    public string? Detalle { get; set; }

    public short? Orden { get; set; }

    public virtual ICollection<Búsqueda> BúsquedaIdDatoNavigations { get; set; } = new List<Búsqueda>();

    public virtual ICollection<Búsqueda> BúsquedaIdFuenteNavigations { get; set; } = new List<Búsqueda>();

    public virtual ICollection<Cuenta> CuentaIdSituaciónNavigations { get; set; } = new List<Cuenta>();

    public virtual ICollection<Cuenta> CuentaIdSucursalNavigations { get; set; } = new List<Cuenta>();

    public virtual ICollection<GestionesChat3> GestionesChat3IdAcercamientoNavigations { get; set; } = new List<GestionesChat3>();

    public virtual ICollection<GestionesChat3> GestionesChat3IdCausaNoPagoNavigations { get; set; } = new List<GestionesChat3>();

    public virtual ICollection<GestionesChat3> GestionesChat3IdContactoNavigations { get; set; } = new List<GestionesChat3>();

    public virtual ICollection<GestionesChat3> GestionesChat3IdEtapaNavigations { get; set; } = new List<GestionesChat3>();

    public virtual ICollection<GestionesChat3> GestionesChat3IdParentescoNavigations { get; set; } = new List<GestionesChat3>();

    public virtual ICollection<GestionesChat3> GestionesChat3IdSituaciónNavigations { get; set; } = new List<GestionesChat3>();

    public virtual ICollection<GestionesChat3> GestionesChat3IdSucursalNavigations { get; set; } = new List<GestionesChat3>();

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

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicas { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónicas3> GestionesTelefónicas3IdAcercamientoNavigations { get; set; } = new List<GestionesTelefónicas3>();

    public virtual ICollection<GestionesTelefónicas3> GestionesTelefónicas3IdCausaNoPagoNavigations { get; set; } = new List<GestionesTelefónicas3>();

    public virtual ICollection<GestionesTelefónicas3> GestionesTelefónicas3IdContactoNavigations { get; set; } = new List<GestionesTelefónicas3>();

    public virtual ICollection<GestionesTelefónicas3> GestionesTelefónicas3IdModoNavigations { get; set; } = new List<GestionesTelefónicas3>();

    public virtual ICollection<GestionesTelefónicas3> GestionesTelefónicas3IdParentescoNavigations { get; set; } = new List<GestionesTelefónicas3>();

    public virtual ICollection<GestionesTelefónicas3> GestionesTelefónicas3IdSituaciónNavigations { get; set; } = new List<GestionesTelefónicas3>();

    public virtual ICollection<GestionesTelefónicas3> GestionesTelefónicas3IdSucursalNavigations { get; set; } = new List<GestionesTelefónicas3>();

    public virtual Catálogo IdCatálogoNavigation { get; set; } = null!;

    public virtual ICollection<Paquete> Paquetes { get; set; } = new List<Paquete>();

    public virtual ICollection<Pausa> Pausas { get; set; } = new List<Pausa>();

    public virtual ICollection<Pausas5> Pausas5s { get; set; } = new List<Pausas5>();

    public virtual ICollection<RelacionesCatálogo> RelacionesCatálogos { get; set; } = new List<RelacionesCatálogo>();
}
