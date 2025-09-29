using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class VwAccionamiento1
{
    public short IdCartera { get; set; }

    public DateOnly Fecha { get; set; }

    public string? Cargó { get; set; }

    public string Cuenta { get; set; } = null!;

    public string? Acercamiento { get; set; }

    public string? Nombre { get; set; }

    public string? Descripción { get; set; }

    public string Mensaje { get; set; } = null!;
}
