using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class ConsultaAgrupar
{
    public int IdAgrupar { get; set; }

    public int IdConsulta { get; set; }

    public string Campo { get; set; } = null!;

    public string Concepto { get; set; } = null!;

    public virtual Consulta IdConsultaNavigation { get; set; } = null!;
}
