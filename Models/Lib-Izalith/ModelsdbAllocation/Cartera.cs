using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbAllocation;

public partial class Cartera
{
    public short IdCartera { get; set; }

    public string Cartera1 { get; set; } = null!;

    public bool Activo { get; set; }

    public bool CambioProducto { get; set; }

    public bool EliminaPagosMes { get; set; }

    public byte MesesBorrado { get; set; }

    public virtual ICollection<CamposTxt> CamposTxts { get; set; } = new List<CamposTxt>();

    public virtual ICollection<CuentasQuejaHistorial> CuentasQuejaHistorials { get; set; } = new List<CuentasQuejaHistorial>();

    public virtual ICollection<CuentasQueja> CuentasQuejas { get; set; } = new List<CuentasQueja>();

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();

    public virtual ICollection<TeléfonosAllocation> TeléfonosAllocations { get; set; } = new List<TeléfonosAllocation>();
}
