using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class ProcesoJudicial
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? IdEjecutivo { get; set; }

    public string? RecepcionPagare { get; set; }

    public int? IdTipoEtapaRecurso { get; set; }

    public int? IdTipoJuicio { get; set; }

    public int? IdTipoVia { get; set; }

    public int? IdEtapa { get; set; }

    public int? IdAutoAdmisorio { get; set; }

    public int? IdCausaDesechada { get; set; }

    public int? IdPrevencion { get; set; }

    public int? IdEmplazamiento { get; set; }

    public int? IdCierreEmplazamiento { get; set; }

    public int? IdContestDemanda { get; set; }

    public int? IdPrueba { get; set; }

    public int? IdIncidenteliquidacion { get; set; }

    public int? IdSentenciaDefinitiva { get; set; }

    public int? IdSentenciaFirme { get; set; }

    public int? IdEjecuSentencia { get; set; }

    public int? IdRemates { get; set; }

    public int? IdTipoRecursos { get; set; }

    public int? IdTipoApelacion { get; set; }

    public int? IdTipoAmparo { get; set; }

    public int? IdCierreAmparo { get; set; }

    public DateOnly? FechaPagare { get; set; }

    public DateOnly? FechaFinal { get; set; }

    public string? Folio { get; set; }

    public string? Juzgado { get; set; }

    public string? Comentario { get; set; }
}
