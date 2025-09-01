using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class RespuestasPvc
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public int IdEjecutivo { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? IdTipoPvc { get; set; }

    public int? IdDetallesPvc { get; set; }

    public string? NombreResponsable { get; set; }

    public TimeOnly? HoraLocalizacion { get; set; }

    public long? NúmeroTelefónico { get; set; }
}
