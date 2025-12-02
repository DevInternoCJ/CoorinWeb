using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class ConsultaParámetro
{
    public int IdParámetro { get; set; }

    public int IdConsulta { get; set; }

    public string Concepto { get; set; } = null!;

    public string Campo { get; set; } = null!;

    public string Valores { get; set; } = null!;

    public string Parámetros { get; set; } = null!;

    public string Dato { get; set; } = null!;

    public virtual Consulta IdConsultaNavigation { get; set; } = null!;
}
