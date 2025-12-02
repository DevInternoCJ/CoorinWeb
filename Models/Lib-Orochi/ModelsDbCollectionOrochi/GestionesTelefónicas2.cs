using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class GestionesTelefónicas2
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public long? NúmeroTelefónico { get; set; }

    public short IdContacto { get; set; }

    public short? IdSituación { get; set; }

    public short IdSucursal { get; set; }

    public short Extensión { get; set; }

    public short IdModo { get; set; }

    public short? IdAcercamiento { get; set; }

    public TimeOnly Duración { get; set; }

    public TimeOnly TiempoEnCuenta { get; set; }

    public short? IdParentesco { get; set; }

    public string? NombreContacto { get; set; }

    public short? IdCausaNoPago { get; set; }

    public string? Comentario { get; set; }

    public int? IdValidador { get; set; }

    public virtual ValoresCatálogo? IdAcercamientoNavigation { get; set; }

    public virtual ValoresCatálogo? IdCausaNoPagoNavigation { get; set; }

    public virtual ValoresCatálogo IdContactoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdModoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo? IdParentescoNavigation { get; set; }

    public virtual ValoresCatálogo? IdSituaciónNavigation { get; set; }

    public virtual ValoresCatálogo IdSucursalNavigation { get; set; } = null!;

    public virtual Ejecutivo? IdValidadorNavigation { get; set; }
}
