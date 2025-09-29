using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class Cartera
{
    public byte[]? Cuenta { get; set; }

    public byte[]? Nombre { get; set; }

    public byte[]? DirCalleNumero { get; set; }

    public string? Dircolonia { get; set; }

    public string? DirDelMun { get; set; }

    public string? CódigoPostal { get; set; }

    public string? Product { get; set; }

    public decimal? Saldovencido { get; set; }
}
