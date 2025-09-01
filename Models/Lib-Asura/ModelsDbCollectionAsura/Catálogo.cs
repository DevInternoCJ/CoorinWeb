using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class Catálogo
{
    public byte IdCatálogo { get; set; }

    public string Catálogo1 { get; set; } = null!;

    public string? NombreId { get; set; }

    public string DescripciónCatálogo { get; set; } = null!;

    public DateOnly FechaCatálogo { get; set; }

    public virtual ICollection<ValoresCatálogo> ValoresCatálogos { get; set; } = new List<ValoresCatálogo>();
}
