using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class GestionesMail
{
    public int Id { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public long IdAcercamiento { get; set; }

    public int IdModo { get; set; }

    public string CorreoElectrónico { get; set; } = null!;

    public short IdContacto { get; set; }

    public short? IdSituación { get; set; }

    public short? IdParentesco { get; set; }

    public string? NombreContacto { get; set; }

    public short? IdCausaNoPago { get; set; }

    public short IdSucursal { get; set; }

    public TimeOnly Duración { get; set; }

    public TimeOnly TiempoEnCuenta { get; set; }

    public string Comentario { get; set; } = null!;
}
