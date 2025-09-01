using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationAsura;

public partial class VwCarterasProducto
{
    public short IdCartera { get; set; }

    public string Cartera { get; set; } = null!;

    public bool CambioProducto { get; set; }

    public short IdProducto { get; set; }

    public string Producto { get; set; } = null!;

    public string? NombresArchivosVálidos { get; set; }

    public string? NombresArchivosInválidos { get; set; }

    public bool Cuadre { get; set; }

    public float Desactivación { get; set; }

    public string? Abreviación { get; set; }
}
