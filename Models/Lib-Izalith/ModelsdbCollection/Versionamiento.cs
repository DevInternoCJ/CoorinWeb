using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class Versionamiento
{
    public string Aplicación { get; set; } = null!;

    public byte Mayor { get; set; }

    public byte Minor { get; set; }

    public byte Build { get; set; }

    public DateOnly Fecha { get; set; }

    public bool Trascendente { get; set; }

    public string Descripción { get; set; } = null!;
}
