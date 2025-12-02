using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class AsignacionFuente
{
    public int Id { get; set; }

    public short? IdCartera { get; set; }

    public int? IdEjecutivo { get; set; }

    public string? Fuente { get; set; }

    public bool? Activo { get; set; }
}
