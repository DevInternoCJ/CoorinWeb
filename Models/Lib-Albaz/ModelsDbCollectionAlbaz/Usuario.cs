using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class Usuario
{
    public int Id { get; set; }

    public string? IdEjecutivo { get; set; }

    public string? NombreEjecutivo { get; set; }

    public string? Usuario1 { get; set; }

    public DateOnly? Fecha { get; set; }

    public string? IdEncargado { get; set; }

    public int? Curso { get; set; }

    public DateOnly? FechaIngreso { get; set; }

    public DateOnly? FecEncuesta { get; set; }

    public string? Area { get; set; }

    public int? Días { get; set; }

    public DateOnly? FechaUpdate { get; set; }

    public string? Cartera { get; set; }
}
