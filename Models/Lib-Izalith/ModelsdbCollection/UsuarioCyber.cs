using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class UsuarioCyber
{
    public int IdEjecutivo { get; set; }

    public string Login { get; set; } = null!;

    public string UserCyber { get; set; } = null!;

    public string? Nombre { get; set; }

    public bool? Activo { get; set; }

    public DateOnly? FechaAlta { get; set; }

    public DateOnly? FechaBaja { get; set; }

    public int? IdProducto { get; set; }

    public int? IdEjecutivoAlta { get; set; }
}
