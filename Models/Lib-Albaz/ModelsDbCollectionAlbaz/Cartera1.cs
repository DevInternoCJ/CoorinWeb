using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class Cartera1
{
    public short IdCartera { get; set; }

    public string Cartera { get; set; } = null!;

    public string? Abreviación { get; set; }

    public bool Complemento { get; set; }

    public virtual ICollection<Búsqueda> Búsqueda { get; set; } = new List<Búsqueda>();

    public virtual ICollection<Búsquedum> BúsquedaNavigation { get; set; } = new List<Búsquedum>();

    public virtual ICollection<BúsquedasV> BúsquedasVs { get; set; } = new List<BúsquedasV>();

    public virtual ICollection<Consulta> Consulta { get; set; } = new List<Consulta>();

    public virtual ICollection<Ejecutivo> Ejecutivos { get; set; } = new List<Ejecutivo>();

    public virtual ICollection<ListaNegraCorreo> ListaNegraCorreos { get; set; } = new List<ListaNegraCorreo>();

    public virtual ICollection<ListaNegraCorreosHistorial> ListaNegraCorreosHistorials { get; set; } = new List<ListaNegraCorreosHistorial>();

    public virtual ICollection<ListaNegraTeléfono> ListaNegraTeléfonos { get; set; } = new List<ListaNegraTeléfono>();

    public virtual ICollection<ListaNegraTeléfonosHistorial> ListaNegraTeléfonosHistorials { get; set; } = new List<ListaNegraTeléfonosHistorial>();

    public virtual ICollection<Paquete> Paquetes { get; set; } = new List<Paquete>();

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
