using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class ListaNegraCorreo
{
    public short IdCartera { get; set; }

    public string Correo { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public string? IdCuenta { get; set; }

    public long? FolioRedeco { get; set; }

    public string? Solicitante { get; set; }

    public virtual Cartera IdCarteraNavigation { get; set; } = null!;
}
