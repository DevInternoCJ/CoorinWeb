using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class TblWconvenio
{
    public string? Cuenta { get; set; }

    public string? Convenio { get; set; }

    public string? TotalAdeudo { get; set; }

    public string? MontoConvenio { get; set; }

    public DateTime? FechaInsert { get; set; }
}
