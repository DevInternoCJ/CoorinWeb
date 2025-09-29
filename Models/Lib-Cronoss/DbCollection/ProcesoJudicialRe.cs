using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class ProcesoJudicialRe
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? Idejecutivo { get; set; }

    public int? IdTipoJuicio { get; set; }

    public int? IdCasoJuicio { get; set; }

    public int? IdTipoAcuerdoAdm { get; set; }

    public int? IdCausaAcuerdoAdm { get; set; }

    public int? IdCausaAcuerdoPago { get; set; }

    public DateOnly? FechaPagare { get; set; }

    public DateOnly? FechaPresentacion { get; set; }

    public string? Folio { get; set; }

    public string? Juzgado { get; set; }

    public string? ContestacionDemanda { get; set; }

    public int? IdEmplazamiento { get; set; }

    public string? TipoAudPruebasAlegatos { get; set; }

    public int? IdSentencia { get; set; }

    public string? SalaApelacion { get; set; }

    public string? AmparoDirecto { get; set; }
}
