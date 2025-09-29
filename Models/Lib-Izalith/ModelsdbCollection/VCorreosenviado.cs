using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class VCorreosenviado
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public TimeOnly? SegundoPaquete { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public string CorreoElectrónico { get; set; } = null!;

    public short IdEtapa { get; set; }

    public string Asunto { get; set; } = null!;

    public string Mensaje { get; set; } = null!;

    public short? IdTipoMensaje { get; set; }
}
