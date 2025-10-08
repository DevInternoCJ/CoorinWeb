using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class ComentariosEspeciale
{
    public string IdCuenta { get; set; } = null!;

    public short IdCartera { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    public string Comentario { get; set; } = null!;

    public string Accion { get; set; } = null!;

    public string ResultadoCliente { get; set; } = null!;

    public string Actividad { get; set; } = null!;
}
