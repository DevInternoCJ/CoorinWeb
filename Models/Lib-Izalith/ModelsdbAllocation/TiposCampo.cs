using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbAllocation;

public partial class TiposCampo
{
    public byte IdTipoCampo { get; set; }

    public string TipoCampo { get; set; } = null!;

    public int? TamañoCampo { get; set; }

    public byte? IdJob { get; set; }

    public string? Descripción { get; set; }

    public virtual ICollection<CamposAsig> CamposAsigs { get; set; } = new List<CamposAsig>();

    public virtual Job? IdJobNavigation { get; set; }
}
