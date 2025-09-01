using System;
using System.Collections.Generic;

namespace Loki.ModelsBBVA_VGP;

public partial class ValoresCatálogo
{
    public short IdValor { get; set; }

    public short IdCatálogo { get; set; }

    public string Valor { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public bool Activo { get; set; }

    public string? Detalle { get; set; }

    public virtual ICollection<DocumentaciónAuto> DocumentaciónAutos { get; set; } = new List<DocumentaciónAuto>();

    public virtual Catálogo IdCatálogoNavigation { get; set; } = null!;

    public virtual ICollection<InventarioAuto> InventarioAutos { get; set; } = new List<InventarioAuto>();

    public virtual ICollection<Solicitude> Solicitudes { get; set; } = new List<Solicitude>();
}
