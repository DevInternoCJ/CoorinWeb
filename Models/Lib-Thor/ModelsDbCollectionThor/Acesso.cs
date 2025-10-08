using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class Acesso
{
    public int? IdEjecutivo { get; set; }

    public bool? Arrepentimientos { get; set; }

    public bool? Visitas { get; set; }

    public bool? CargaInformación { get; set; }

    public bool? ProcesoJudicial { get; set; }

    public bool? ProcesoCartera { get; set; }

    public virtual Ejecutivo? IdEjecutivoNavigation { get; set; }
}
