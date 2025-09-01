using System;
using System.Collections.Generic;

namespace Loki.ModelsBBVA_VGP;

public partial class Catálogo
{
    public short IdCatálogo { get; set; }

    public string Catálogo1 { get; set; } = null!;

    public string NombreId { get; set; } = null!;

    public string? Descripción { get; set; }

    public DateOnly FechaInsert { get; set; }

    public virtual ICollection<ValoresCatálogo> ValoresCatálogos { get; set; } = new List<ValoresCatálogo>();
}
