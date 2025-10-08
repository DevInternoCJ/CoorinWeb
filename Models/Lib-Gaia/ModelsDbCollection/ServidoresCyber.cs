using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class ServidoresCyber
{
    public string Servidor { get; set; } = null!;

    public string? Ubicacion { get; set; }

    public string? Contraseña { get; set; }

    public bool Activo { get; set; }

    public DateTime? FechaAlta { get; set; }

    public DateTime? FechaBaja { get; set; }
}
