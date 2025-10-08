using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class Cartera1
{
    public short IdCartera { get; set; }

    public string Cartera { get; set; } = null!;

    public string? Abreviación { get; set; }

    public bool Complemento { get; set; }

    public virtual ICollection<Búsqueda> Búsqueda { get; set; } = new List<Búsqueda>();

    public virtual ICollection<Consulta> Consulta { get; set; } = new List<Consulta>();

    public virtual ICollection<Ejecutivo> Ejecutivos { get; set; } = new List<Ejecutivo>();

    public virtual ICollection<ListaNegraCorreo> ListaNegraCorreos { get; set; } = new List<ListaNegraCorreo>();

    public virtual ICollection<Paquete> Paquetes { get; set; } = new List<Paquete>();

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();

    public virtual ICollection<Teléfono> Teléfonos { get; set; } = new List<Teléfono>();

    public virtual ICollection<TeléfonosBackup> TeléfonosBackups { get; set; } = new List<TeléfonosBackup>();
}
