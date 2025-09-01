using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class TblIntensidadBit
{
    public int Id { get; set; }

    public string? Tipo { get; set; }

    public int? Intensidad { get; set; }

    public string? PeriodoT { get; set; }

    public int? Mv { get; set; }

    public string? PeriodoMv { get; set; }

    public int? Visita { get; set; }

    public string? PeriodoV { get; set; }

    public int? Email { get; set; }

    public string? PeriodoE { get; set; }

    public int? Sms { get; set; }

    public string? PeriodoSm { get; set; }

    public int? Cartas { get; set; }

    public string? PeriodoC { get; set; }

    public int? Skip { get; set; }

    public string? PeriodoSk { get; set; }
}
