using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.History;

public partial class DatosErróneo
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateTime FechaHoraInsert { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivoInsert { get; set; }

    public byte IdDatoErróneo { get; set; }
}
