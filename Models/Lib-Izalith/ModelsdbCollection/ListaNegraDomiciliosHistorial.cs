using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class ListaNegraDomiciliosHistorial
{
    public int IdListaNegra { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaListaNegra { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public long? FolioRedeco { get; set; }

    public string? Solicitante { get; set; }

    public string CalleNum { get; set; } = null!;

    public string Colonia { get; set; } = null!;

    public string Municipio { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public string Cp { get; set; } = null!;
}
