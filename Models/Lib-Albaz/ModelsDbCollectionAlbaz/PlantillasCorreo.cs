using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class PlantillasCorreo
{
    public short IdCorreoScript { get; set; }

    public short IdProducto { get; set; }

    public string? Descripción { get; set; }

    public string Nombre { get; set; } = null!;

    public string Asunto { get; set; } = null!;

    public string Mensaje { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public virtual Ejecutivo IdEjecutivoInsertNavigation { get; set; } = null!;

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
