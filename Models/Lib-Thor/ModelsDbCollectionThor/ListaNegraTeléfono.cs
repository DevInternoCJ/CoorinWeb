using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class ListaNegraTeléfono
{
    public int IdListaNegra { get; set; }

    public short IdCartera { get; set; }

    public long NúmeroTelefónico { get; set; }

    public DateOnly FechaListaNegra { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public string? IdCuenta { get; set; }

    public string? FolioRedeco { get; set; }

    public string? Solicitante { get; set; }

    public virtual Cartera1 IdCarteraNavigation { get; set; } = null!;
}
