using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class Consulta
{
    public int IdConsulta { get; set; }

    public DateOnly FechaInsert { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public string NombreConsulta { get; set; } = null!;

    public short? IdProducto { get; set; }

    public DateOnly Desde { get; set; }

    public short? IdCartera { get; set; }

    public virtual ICollection<ConsultaAgrupar> ConsultaAgrupars { get; set; } = new List<ConsultaAgrupar>();

    public virtual ICollection<ConsultaParámetro> ConsultaParámetros { get; set; } = new List<ConsultaParámetro>();

    public virtual Cartera? IdCarteraNavigation { get; set; }

    public virtual Producto? IdProductoNavigation { get; set; }
}
