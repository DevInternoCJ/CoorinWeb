using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.History;

public partial class VwMaxContacto
{
    public string Cuenta { get; set; } = null!;

    public long? NúmeroTelefónico { get; set; }

    public short IdContacto { get; set; }

    public string? CódigoResultado { get; set; }

    public byte? Ponderación { get; set; }
}
