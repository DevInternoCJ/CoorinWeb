using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class VwTblCuenta1
{
    public int Expediente { get; set; }

    public byte[]? Cuenta { get; set; }

    public byte[]? Nombre { get; set; }

    public byte[]? DirCalleNumero { get; set; }

    public string? Dircolonia { get; set; }

    public string? DirDelMun { get; set; }

    public string? Cp { get; set; }

    public string? Producto { get; set; }

    public decimal Saldo { get; set; }
}
