using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class CsRelacionado
{
    public string? Cuenta { get; set; }

    public string? Nombre { get; set; }

    public string? TipoRelacion { get; set; }

    public string InfoAdicional { get; set; } = null!;

    public string? Producto { get; set; }

    public string? FechaInsert { get; set; }

    public int? Cartera { get; set; }

    public int? NumInsercion { get; set; }

    public int? Correcto { get; set; }

    public string? Cliente { get; set; }
}
