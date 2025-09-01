using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class VwObtienePrnego
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public TimeOnly Duración { get; set; }

    public long? NúmeroTelefónico { get; set; }

    public string? Comentario { get; set; }

    public short? Idvalor { get; set; }

    public decimal? MontoPago { get; set; }

    public int IdEjecutivo { get; set; }

    public bool? Cumplido { get; set; }

    public DateOnly? FechaPago { get; set; }

    public DateOnly? FechaInicioPlazo { get; set; }

    public DateOnly? FechaFinPlazo { get; set; }

    public decimal? SumaPagos { get; set; }

    public byte? Pagos { get; set; }

    public bool? Válido { get; set; }

    public byte? Ordinal { get; set; }

    public short? IdHerramienta { get; set; }

    public decimal? SaldoNegociación { get; set; }

    public decimal? Mensualiodad { get; set; }

    public int? Diap { get; set; }

    public byte? Plazos { get; set; }

    public decimal? MontoNegociado { get; set; }

    public short? IdCausanopago { get; set; }

    public short IdModo { get; set; }

    public int? Folio { get; set; }

    public string? Nombrecontacto { get; set; }
}
