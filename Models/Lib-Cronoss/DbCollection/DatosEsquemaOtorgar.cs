using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class DatosEsquemaOtorgar
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? IdEjecutivo { get; set; }

    public string? TipoTarjeta { get; set; }

    public decimal? TasaReestructura { get; set; }

    public decimal? NuevaTasaReestructura { get; set; }

    public int? Plazo { get; set; }

    public string? TipoPlazo { get; set; }

    public decimal? PagoMensual { get; set; }

    public string? Evaluacion { get; set; }

    public decimal? PagoMinAntesMora { get; set; }

    public decimal? Disminucion { get; set; }

    public string? Viabilidad { get; set; }

    public decimal? DiferenciaPagoAnterior { get; set; }
}
