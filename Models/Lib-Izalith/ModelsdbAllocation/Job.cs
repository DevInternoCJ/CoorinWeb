using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbAllocation;

public partial class Job
{
    public byte IdJob { get; set; }

    public string Job1 { get; set; } = null!;

    public string StoreProcedure { get; set; } = null!;

    public string Descripción { get; set; } = null!;

    public virtual ICollection<Ejecucione> Ejecuciones { get; set; } = new List<Ejecucione>();

    public virtual ICollection<TiposCampo> TiposCampos { get; set; } = new List<TiposCampo>();
}
