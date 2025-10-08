using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class VwEjecutivosCambio
{
    public bool? Cambiar { get; set; }

    public int NoEmpleado { get; set; }

    public string Usuario { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public short? IdProducto { get; set; }

    public string? Sucursal { get; set; }

    public string? Área { get; set; }

    public string? Cartera { get; set; }

    public string? Producto { get; set; }

    public byte Jerarquía { get; set; }

    public string? Puesto { get; set; }

    public bool? Domiciliario { get; set; }

    public bool? Telefónico { get; set; }

    public string? Encargado { get; set; }

    public byte IdJerarquía { get; set; }

    public DateOnly FechaAlta { get; set; }
}
