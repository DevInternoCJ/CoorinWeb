using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class Producto
{
    public short IdProducto { get; set; }

    public short IdCartera { get; set; }

    public string Producto1 { get; set; } = null!;

    public TimeOnly TiempoLímiteCuenta { get; set; }

    public byte IntentosNoCorresponde { get; set; }

    public byte IntentosSeguimiento { get; set; }

    public bool UsaPredictivo { get; set; }

    public virtual ICollection<CamposPantalla> CamposPantallas { get; set; } = new List<CamposPantalla>();

    public virtual ICollection<Consulta> Consulta { get; set; } = new List<Consulta>();

    public virtual ICollection<Cuenta> Cuenta { get; set; } = new List<Cuenta>();

    public virtual ICollection<Ejecutivo> Ejecutivos { get; set; } = new List<Ejecutivo>();

    public virtual Cartera IdCarteraNavigation { get; set; } = null!;

    public virtual ParámetrosProducto? ParámetrosProducto { get; set; }

    public virtual ICollection<PlantillasCorreo> PlantillasCorreos { get; set; } = new List<PlantillasCorreo>();

    public virtual ICollection<Script> Scripts { get; set; } = new List<Script>();

    public virtual ICollection<Validadore> Validadores { get; set; } = new List<Validadore>();
}
