using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class ListaNegraTeléfono
{
    public int IdListaNegraTeléfonos { get; set; }

    public short IdCartera { get; set; }

    public long NúmeroTelefónico { get; set; }

    public DateTime FechaListaNegra { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public string? IdCuenta { get; set; }

    public long? FolioRedeco { get; set; }

    public string? Solicitante { get; set; }
}
