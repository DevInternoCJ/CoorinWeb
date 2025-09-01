using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class MarcaciónInternacional
{
    public short IdTelefonía { get; set; }

    public short Clave { get; set; }

    public string País { get; set; } = null!;

    public string Idioma { get; set; } = null!;

    public short Verano { get; set; }

    public short Invierno { get; set; }
}
