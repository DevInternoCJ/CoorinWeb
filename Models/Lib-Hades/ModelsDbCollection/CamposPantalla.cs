using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class CamposPantalla
{
    public short IdProducto { get; set; }

    public byte Posición { get; set; }

    public int? IdEjecutivo { get; set; }

    public DateOnly? FechaUpdate { get; set; }

    public string AliasCampo { get; set; } = null!;

    public string NombreCampo { get; set; } = null!;

    public byte IdFormatoCampo { get; set; }

    public byte Resaltado { get; set; }

    public virtual Ejecutivo? IdEjecutivoNavigation { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
