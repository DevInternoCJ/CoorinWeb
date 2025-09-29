using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class UsuarioSorianaCliente
{
    public int IdEjecutivo { get; set; }

    public string Usuario { get; set; } = null!;

    public string? NombreEjecutivo { get; set; }

    public bool? Activo { get; set; }

    public DateOnly FechaActivo { get; set; }

    public DateOnly? FechaInactivo { get; set; }
}
