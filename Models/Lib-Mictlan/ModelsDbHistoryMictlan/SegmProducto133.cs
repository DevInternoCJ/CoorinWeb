using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class SegmProducto133
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Agencia { get; set; }

    public string? FechaAsignacion { get; set; }

    public string? MontoAgencia { get; set; }

    public string? DiaCorte { get; set; }

    public string? PagosVencidos { get; set; }

    public string? DiasMorosos { get; set; }

    public string? TotalDeudor { get; set; }

    public string? MontoMoroso { get; set; }

    public string? PagoMinimo { get; set; }

    public string? CodigoBloqueo { get; set; }

    public string? FechaCodBloqueo { get; set; }

    public string? StatusCli { get; set; }

    public string? FecUltGestion { get; set; }

    public string? CodAccion { get; set; }
}
