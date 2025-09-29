using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class CatalogoAccionamiento
{
    public int IdCartera { get; set; }

    public string TipoMensaje { get; set; } = null!;

    public string Mensaje { get; set; } = null!;

    public int? Descuento { get; set; }

    public int? Pagos { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public int? Activo { get; set; }

    public int? IdEjecutivo { get; set; }
}
