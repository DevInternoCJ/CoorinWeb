using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationAsura;

public partial class CargasAlCliente
{
    public short IdCargaAlCliente { get; set; }

    public bool Activo { get; set; }

    public short IdCartera { get; set; }

    public string NombreCarga { get; set; } = null!;

    public string Descripción { get; set; } = null!;

    public string BaseDatos { get; set; } = null!;

    public string Esquema { get; set; } = null!;

    public string Store { get; set; } = null!;

    public bool ParamProducto { get; set; }

    public DateTime FechaHoraInsert { get; set; }
}
