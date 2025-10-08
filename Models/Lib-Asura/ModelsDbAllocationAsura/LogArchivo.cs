using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class LogArchivo
{
    public int IdLogArchivo { get; set; }

    public int IdLogAsignación { get; set; }

    public string NombreArchivo { get; set; } = null!;

    public int RegistrosArchivo { get; set; }

    public bool? ValidaciónLayout { get; set; }

    public bool? ValidaciónFormatos { get; set; }

    public bool? ValicaciónConteoRegistros { get; set; }

    public bool? ValidaciónInformaciónCrítica { get; set; }

    public virtual LogAsignación IdLogAsignaciónNavigation { get; set; } = null!;
}
