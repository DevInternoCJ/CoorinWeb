using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class CuentasAcción
{
    public short IdProducto { get; set; }

    /// <summary>
    /// 0 desactivar, 1 activar, 2 nueva. 
    /// </summary>
    public byte IdAcción { get; set; }

    public short IdCartera { get; set; }

    /// <summary>
    /// El número de cuenta con el cual se relacionará con la tabla de asignación.
    /// </summary>
    public string IdCuenta { get; set; } = null!;

    public virtual Accione IdAcciónNavigation { get; set; } = null!;
}
