using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class TblLogRen
{
    public long IdError { get; set; }

    public string? Error { get; set; }

    public DateTime? Fecha { get; set; }

    public string? Idgestion { get; set; }

    public string? Archivo { get; set; }

    public string? Etiqueta { get; set; }
}
