using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class BaseG
{
    public double? IdAgencia { get; set; }

    public DateTime? Fecha { get; set; }

    public DateTime? Hora { get; set; }

    public string? NumeroDeCuenta { get; set; }

    public string? Segmento { get; set; }

    public string? Telefonico { get; set; }

    public string? Nombre { get; set; }

    public string? Cacr { get; set; }

    public string? Dispositivo { get; set; }

    public string? Inventario { get; set; }

    public string? Archivo { get; set; }

    public string? Aplica { get; set; }

    public bool? Renombrar { get; set; }
}
