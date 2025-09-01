using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationAsura;

public partial class TeléfonosComplemento
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public long Númerotelefónico { get; set; }

    public string? NúmeroCliente { get; set; }

    public string? Calificacion { get; set; }

    public string Segmento { get; set; } = null!;

    public DateOnly? FechaInsert { get; set; }
}
