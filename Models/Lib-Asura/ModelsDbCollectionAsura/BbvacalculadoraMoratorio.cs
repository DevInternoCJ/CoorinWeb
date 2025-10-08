using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class BbvacalculadoraMoratorio
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? IdEjecutivo { get; set; }

    public string? Periodo { get; set; }

    public decimal? HonorarioBase { get; set; }

    public decimal? Moratorios { get; set; }

    public decimal? Condonacion { get; set; }

    public decimal? SubTotal { get; set; }

    public decimal? Iva { get; set; }

    public decimal? TotalPorAño { get; set; }

    public string? TipoTasaInteres { get; set; }
}
