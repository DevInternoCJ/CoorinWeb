using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class Cartera
{
    public short IdCartera { get; set; }

    public string Cartera1 { get; set; } = null!;

    public string Abreviación { get; set; } = null!;

    public bool Complemento { get; set; }

    public virtual ICollection<Búsqueda> Búsqueda { get; set; } = new List<Búsqueda>();

    public virtual ICollection<Paquete> Paquetes { get; set; } = new List<Paquete>();
}
