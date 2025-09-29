using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class GestionesChat
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
    /// Indica si la gestión fue de salida o de entrada.
    /// </summary>
    public bool Salida { get; set; }

    public short IdAcercamiento { get; set; }

    /// <summary>
    /// Número telefónico a 10 dígitos
    /// </summary>
    public long? NúmeroTelefónico { get; set; }

    public string? IdRedSocial { get; set; }

    public short IdContacto { get; set; }

    public short IdEtapa { get; set; }

    /// <summary>
    /// id de la etapa en la cual estaba la cuenta cuando se gestionó.
    /// Tipo de gestión.
    /// </summary>
    public short? IdSituación { get; set; }

    /// <summary>
    /// id del parentesco con la persona que se realizó la gestión
    /// </summary>
    public short? IdParentesco { get; set; }

    /// <summary>
    /// Nombre de la persona con la que se tuvo la gestión.
    /// </summary>
    public string? NombreContacto { get; set; }

    public short? IdCausaNoPago { get; set; }

    public short IdSucursal { get; set; }

    public TimeOnly Duración { get; set; }

    public TimeOnly TiempoEnCuenta { get; set; }

    public string? Comentario { get; set; }

    public virtual ValoresCatálogo IdAcercamientoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo? IdCausaNoPagoNavigation { get; set; }

    public virtual ValoresCatálogo IdContactoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdEtapaNavigation { get; set; } = null!;

    public virtual ValoresCatálogo? IdParentescoNavigation { get; set; }

    public virtual ValoresCatálogo? IdSituaciónNavigation { get; set; }

    public virtual ValoresCatálogo IdSucursalNavigation { get; set; } = null!;
}
