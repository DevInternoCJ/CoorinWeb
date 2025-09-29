using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class GestionesTelefónica
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    /// <summary>
    /// Número telefónico a 10 dígitos
    /// </summary>
    public long? NúmeroTelefónico { get; set; }

    public short IdContacto { get; set; }

    /// <summary>
    /// id de la etapa en la cual estaba la cuenta cuando se gestionó.
    /// Tipo de gestión.
    /// </summary>
    public short? IdSituación { get; set; }

    public short IdSucursal { get; set; }

    public short Extensión { get; set; }

    public short IdModo { get; set; }

    public short? IdAcercamiento { get; set; }

    public TimeOnly Duración { get; set; }

    public TimeOnly TiempoEnCuenta { get; set; }

    /// <summary>
    /// id del parentesco con la persona que se realizó la gestión
    /// </summary>
    public short? IdParentesco { get; set; }

    /// <summary>
    /// Nombre de la persona con la que se tuvo la gestión.
    /// </summary>
    public string? NombreContacto { get; set; }

    public short? IdCausaNoPago { get; set; }

    public string? Comentario { get; set; }

    public int? IdValidador { get; set; }

    public virtual Comentario ComentarioNavigation { get; set; } = null!;

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual GrabacionesIntegración? GrabacionesIntegración { get; set; }

    public virtual ValoresCatálogo? IdAcercamientoNavigation { get; set; }

    public virtual ValoresCatálogo? IdCausaNoPagoNavigation { get; set; }

    public virtual ValoresCatálogo IdContactoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdModoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo? IdParentescoNavigation { get; set; }

    public virtual ValoresCatálogo? IdSituaciónNavigation { get; set; }

    public virtual ValoresCatálogo IdSucursalNavigation { get; set; } = null!;

    public virtual Ejecutivo? IdValidadorNavigation { get; set; }

    public virtual ICollection<Ofrecimiento> Ofrecimientos { get; set; } = new List<Ofrecimiento>();

    public virtual Teléfono? Teléfono { get; set; }
}
