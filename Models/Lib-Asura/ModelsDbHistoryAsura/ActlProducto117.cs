using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class ActlProducto117
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Segmento { get; set; }

    public string? Etapa { get; set; }

    public string? Status { get; set; }

    public string? SaldoVencido { get; set; }

    public string? SaldoTotal { get; set; }

    public string? FechaEnQueLaCuentaEntróACobranza { get; set; }

    public string? DíasDeMora { get; set; }

    public string? PagosVencidos { get; set; }

    public string? MoraReal { get; set; }

    public string? Prioridad { get; set; }

    public string? BlockCode { get; set; }

    public string? BlockCode2 { get; set; }

    public string? Etiqueta1 { get; set; }

    public string? Etiqueta2 { get; set; }

    public string? Etiqueta3 { get; set; }

    public string? TipoDeTarjeta { get; set; }
}
