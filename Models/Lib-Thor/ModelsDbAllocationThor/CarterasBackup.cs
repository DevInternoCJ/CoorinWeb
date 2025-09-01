using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class CarterasBackup
{
    public short IdCartera { get; set; }

    public string Cartera { get; set; } = null!;

    public bool Activo { get; set; }

    public bool CambioProducto { get; set; }

    public bool EliminaPagosMes { get; set; }

    public virtual ICollection<CamposTxt> CamposTxts { get; set; } = new List<CamposTxt>();

    public virtual ICollection<CuentasQueja> CuentasQuejas { get; set; } = new List<CuentasQueja>();

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();

    public virtual ICollection<TeléfonosAllocationBackup> TeléfonosAllocationBackups { get; set; } = new List<TeléfonosAllocationBackup>();
}
