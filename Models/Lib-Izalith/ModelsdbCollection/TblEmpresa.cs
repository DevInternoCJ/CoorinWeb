using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class TblEmpresa
{
    public short? Id { get; set; }

    public string? Folio { get; set; }

    public string? IdEmpresa { get; set; }

    public DateOnly? FechaEmpresa { get; set; }
}
