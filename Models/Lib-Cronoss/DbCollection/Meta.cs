using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class Meta
{
    public int IdMeta { get; set; }

    public string? Campo { get; set; }

    public string? Segmento { get; set; }

    public int? IdEjecutivo { get; set; }

    public short IdMedidor { get; set; }

    public DateOnly FechaMetaInicial { get; set; }

    public DateOnly FechaMetaFinal { get; set; }

    public float MetaMínima { get; set; }

    public float ValorMeta { get; set; }

    public bool Alcanzada { get; set; }

    public float AvanceMeta { get; set; }

    public DateOnly FechaInsert { get; set; }

    public virtual ValoresCatálogo IdMedidorNavigation { get; set; } = null!;
}
