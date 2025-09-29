using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.History;

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

    public virtual ICollection<Paquete> Paquetes { get; set; } = new List<Paquete>();

    public virtual ICollection<Pausa> Pausas { get; set; } = new List<Pausa>();

    public virtual ICollection<RelacionesCatálogo> RelacionesCatálogos { get; set; } = new List<RelacionesCatálogo>();
}
