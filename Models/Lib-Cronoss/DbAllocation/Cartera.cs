using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class Cartera
{
    public short IdCartera { get; set; }

    public string Cartera1 { get; set; } = null!;

    public bool Activo { get; set; }

    public bool CambioProducto { get; set; }

    public bool EliminaPagosMes { get; set; }

    public virtual ICollection<CamposTxt> CamposTxts { get; set; } = new List<CamposTxt>();

    public virtual ICollection<CuentasEspeciale> CuentasEspeciales { get; set; } = new List<CuentasEspeciale>();

    public virtual ICollection<CuentasQuejaHistorial> CuentasQuejaHistorials { get; set; } = new List<CuentasQuejaHistorial>();

    public virtual ICollection<CuentasQueja> CuentasQuejas { get; set; } = new List<CuentasQueja>();

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();

    public virtual ICollection<TeléfonosAllocation> TeléfonosAllocations { get; set; } = new List<TeléfonosAllocation>();
}
