using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class PasoNube
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
}
