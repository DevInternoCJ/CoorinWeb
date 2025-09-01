using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class TblRenombrado
{
    public string? Idgestion { get; set; }

    public DateTime? Fecha { get; set; }

    public string? Archivo { get; set; }

    public string? EtiquetaBmx { get; set; }

    public bool? Status { get; set; }
}
