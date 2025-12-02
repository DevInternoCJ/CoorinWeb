using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsAllocation;

public partial class CamposCondicionado
{
    public int IdCampoCondicionado { get; set; }

    public short IdProducto { get; set; }

    public string NombreCampo { get; set; } = null!;

    public string Condición { get; set; } = null!;

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
